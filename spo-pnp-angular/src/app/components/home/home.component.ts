import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data-service';

import * as _ from "lodash";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  firstName: string = "";
  lastName: string = "";
  userName: string = "";
  preferredName: string = "";

  constructor(private userDataService: UserDataService) { }

  ngOnInit() {
    this.userDataService.getCurrentUserDetails().then((userDetails: any) => {
      if (userDetails !== null) {
        const props = userDetails.UserProfileProperties.results;
        const filteredResults = _.chain(props)
          .filter(
            (prop: { Key: string; }) =>
              prop.Key === "FirstName" ||
              prop.Key === "LastName" ||
              prop.Key === "UserName" ||
              prop.Key === "PreferredName"
          )
          .map((prop: { Value: any; }) => prop.Value)
          .value();

        this.firstName = filteredResults[0];
        this.lastName = filteredResults[1];
        this.userName = filteredResults[3];
        this.preferredName = filteredResults[2];
      }
    })
  }
}
