import { IndividualFragment } from "../../generated/graphql";
import { ModalActions } from "../actions/modalActions";

export interface ModalState {
  modalOpen: boolean;
  individual: IndividualFragment | null;
}

const initialState: ModalState = {
  modalOpen: false,
  individual: null,
};

export default function (state = initialState, action: ModalActions) {
  switch (action.type) {
    case "SHOW_MODAL":
      return {
        ...state,
        modalOpen: true,
        individual: action.payload,
      };
    case "HIDE_MODAL":
      return {
        ...state,
        modalOpen: false,
      };
    default:
      return state;
  }
}
