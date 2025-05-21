import { Status } from "@prisma/client"

const getStatus = (status: string) => {
    switch(status) {
        case "InProcess": return Status.InProcess;
        case "Done": return Status.Done;
        default: return Status.ToDo;
    }
}

export default getStatus;