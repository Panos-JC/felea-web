import {
  makeStyles,
  Card,
  Grid,
  TextField,
  IconButton,
  Button,
  Typography,
} from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";
import { convertToRaw, EditorState } from "draft-js";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import {
  ProductInput,
  RegularErrorFragment,
  useCreateProductMutation,
} from "../../../../generated/graphql";
import { GeneralCard } from "../../../shared/generalCard/GeneralCard";
import { RichEditor } from "../../../shared/richEditor/RichEditor";
import { PageTitle } from "../../pageTitle/PageTitle";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  inputWrapper: {
    marginBottom: theme.spacing(2),
  },
  input: {
    width: "100%",
  },
  uploadContainer: {
    padding: theme.spacing(5),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  addIcon: {
    width: 100,
    height: 100,
  },
  uploadInput: {
    display: "none",
  },
  imgPreview: {
    maxWidth: "100%",
    maxHeight: 500,
  },
}));

type Inputs = {
  title: string;
  subtitle: string;
  price: string;
};

interface CreateProductProps {}

export const CreateProduct: React.FC<CreateProductProps> = () => {
  const classes = useStyles();

  const history = useHistory();

  // State
  const [fileUrl, setFileUrl] = useState<string>();
  const [file, setFile] = useState<string>("");
  const [fieldError, setFieldError] = useState<RegularErrorFragment | null>(
    null
  );
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  // GraphQL
  const [createProduct] = useCreateProductMutation();

  const { register, handleSubmit, errors } = useForm();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFileUrl(URL.createObjectURL(e.target.files[0]));

      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => {
        setFile(String(reader.result));
      };
      setFieldError(null);
    }
  };

  const onSubmit = async (formData: Inputs) => {
    const contentRaw = convertToRaw(editorState.getCurrentContent());
    const plainText = editorState.getCurrentContent().getPlainText();

    const input: ProductInput = {
      title: formData.title,
      subtitle: formData.subtitle,
      descriptionRichText: JSON.stringify(contentRaw),
      description: plainText,
      image: file,
      price: parseInt(formData.price),
    };

    console.log(input);

    const { data } = await createProduct({ variables: { input } });

    if (data?.createProduct.error) {
      setFieldError(data.createProduct.error);
    } else if (data?.createProduct) {
      history.goBack();
    }
  };

  return (
    <>
      <PageTitle title="Create New Product" />
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Card className={classes.card}>
              <div className={classes.inputWrapper}>
                <TextField
                  inputRef={register({ required: true })}
                  error={errors.title}
                  helperText={errors.title ? "Required field" : null}
                  className={classes.input}
                  variant="outlined"
                  label="Product Title"
                  name="title"
                />
              </div>
              <div className={classes.inputWrapper}>
                <TextField
                  inputRef={register}
                  className={classes.input}
                  variant="outlined"
                  label="Product Subtitle (Optional)"
                  name="subtitle"
                />
              </div>
              <div className={classes.inputWrapper}>
                <RichEditor
                  error={fieldError?.field === "description"}
                  errorText={
                    fieldError?.field === "description"
                      ? fieldError.message
                      : null
                  }
                  label="Description"
                  editorState={editorState}
                  setEditorState={setEditorState}
                />
              </div>
            </Card>
            <GeneralCard title="Upload Image">
              <div className={classes.uploadContainer}>
                <input
                  type="file"
                  id="upload-image"
                  onChange={handleChange}
                  className={classes.uploadInput}
                />
                <label htmlFor="upload-image">
                  {!fileUrl && (
                    <IconButton
                      color="secondary"
                      aria-label="upload picture"
                      component="span"
                    >
                      <AddCircle className={classes.addIcon} />
                    </IconButton>
                  )}
                  <img className={classes.imgPreview} src={fileUrl} alt="" />
                  {fieldError?.field === "image" && (
                    <Typography>{fieldError.message}</Typography>
                  )}
                </label>
              </div>
            </GeneralCard>
            <GeneralCard title="Price">
              <TextField
                inputRef={register({ required: true })}
                error={errors.title}
                helperText={errors.title ? "Required field" : null}
                className={classes.input}
                variant="outlined"
                label="Price"
                name="price"
                type="number"
              />
            </GeneralCard>
            <Button type="submit" variant="contained" color="primary">
              Create Product
            </Button>
          </form>
        </Grid>
      </Grid>
    </>
  );
};
