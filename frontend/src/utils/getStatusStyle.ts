import Status from "../interfaces/status.i";

const getStatusStyle = (status: Status): string => {
  switch(status) {
    case Status.Done: return "done";
    case Status.InProcess: return "in-process";
    default: return "";
  }
}

export default getStatusStyle;