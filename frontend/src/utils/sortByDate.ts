import IProject from "../interfaces/project.model.i";

const sortByDate = (a: IProject, b: IProject) => {
    const date1 = Date.parse(a.date);
    const date2 = Date.parse(b.date);

    return date1 - date2;
}

export default sortByDate;