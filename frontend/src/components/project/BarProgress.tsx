import IProject from "../../interfaces/project.model.i";
import countRate from "../../utils/countRate";

interface IProps {
    project: IProject
}

function BarProgress({project}: IProps) {
    const {done, inProcess} = countRate({...project});

    return(
        <div className="progress-bar">
          Progress: {(done * 100).toFixed(1)}%
          <div className="main-line line">
              <div className="done-line line" style={{width: `${100 * done}%`}}></div>
              <div className="progress-line line" style={{width: `${100 * inProcess}%`}}></div>
          </div>
        </div>
    )
}

export default BarProgress;