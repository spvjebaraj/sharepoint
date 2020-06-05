import * as React from "react";
import styles from "./SpfxRxjs.module.scss";
import { ISpfxRxjsProps } from "./ISpfxRxjsProps";
import { LibraryService } from "../../../services/libraries/LibraryService";
import { ISpfxRxjsState } from "./ISpfxRxjsState";

export default class SpfxRxjs extends React.Component<
  ISpfxRxjsProps,
  ISpfxRxjsState
> {
  constructor(props: ISpfxRxjsProps) {
    super(props);

    this.state = {
      libraries: []
    };
  }

  public componentDidMount() {
    const service = this.props.serviceScope.consume(
      LibraryService.LibraryServiceKey
    );

    service.getLibraries().subscribe(
      (response: ILibraries[]) => {
        this.setState({
          libraries: response
        });
      },
      error => console.log(error)
    );
  }

  public render(): React.ReactElement<ISpfxRxjsProps> {
    return (
      <div className={styles.spfxRxjs}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>SharePoint List Names</span>
              <p className={styles.subTitle}>
                {this.state.libraries !== null ? (
                  <ul>
                    {this.state.libraries.map(item => (
                      <li key={item.Id}>{item.Title}</li>
                    ))}
                  </ul>
                ) : (
                  <span></span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
