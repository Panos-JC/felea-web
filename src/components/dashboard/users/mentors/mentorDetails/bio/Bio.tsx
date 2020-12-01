import { Typography } from "@material-ui/core";
import { convertFromRaw, Editor, EditorState } from "draft-js";
import React, { useEffect, useState } from "react";
import { useGetBioQuery } from "../../../../../../generated/graphql";
import { GeneralCard } from "../../../../../generalCard/GeneralCard";
import { Loading } from "../../../../../loading/Loading";

interface BioProps {
  mentorId: number;
}

export const Bio: React.FC<BioProps> = ({ mentorId }) => {
  const [editorDisplay, setEditorDisplay] = useState(() =>
    EditorState.createEmpty()
  );

  const { data, loading } = useGetBioQuery({
    variables: { mentorId },
  });

  useEffect(() => {
    if (data?.getBio.result) {
      const rawContent = convertFromRaw(JSON.parse(data.getBio.result));
      setEditorDisplay(EditorState.createWithContent(rawContent));
    }
    console.log(mentorId);
  }, [data, mentorId]);

  return (
    <GeneralCard title="Bio">
      {loading ? (
        <Loading />
      ) : (
        <div>
          <Typography variant="body2" color="textSecondary">
            <Editor
              readOnly
              onChange={(editorState) => null}
              editorState={editorDisplay}
            />
          </Typography>
        </div>
      )}
    </GeneralCard>
  );
};
