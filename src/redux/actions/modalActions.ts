import { IndividualFragment } from "../../generated/graphql";

export interface IShowModal {
  readonly type: "SHOW_MODAL";
  payload: IndividualFragment;
}

export interface IHideModal {
  readonly type: "HIDE_MODAL";
}

export type ModalActions = IShowModal | IHideModal;
