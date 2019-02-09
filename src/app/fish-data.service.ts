import { Injectable } from "@angular/core";
import { fishData, locationsData, pathsData } from "./fish-data";

@Injectable({
  providedIn: "root"
})
export class FishDataService {
  constructor() {}

  private fakeMissedContects(path, lastContact, thisContact) {
    var c = { LocationId: "R", Start: "2011-03-26T22:03:18", Contacts: 0 };
    var lastDate = new Date(lastContact.Start);
    var thisDate = new Date(thisContact.Start);

    var lastIndex = path.indexOf(lastContact.LocationId);
    var thisIndex = path.indexOf(thisContact.LocationId);

    var diff =
      (thisDate.getTime() - lastDate.getTime()) / (thisIndex - lastIndex);
    var numberToAdd = Math.abs(thisIndex - lastIndex);
    var sign = Math.sign(thisIndex - lastIndex);

    console.log(`a${lastContact.LocationId} : ${new Date(lastContact.Start)} `);
    for (var i = 1; i < numberToAdd; i++) {
      console.log(
        `${path[lastIndex + i * sign]} : ${new Date(
          lastDate.getTime() + diff * i
        )} `
      );
    }
    console.log(`z${thisContact.LocationId} : ${new Date(thisContact.Start)} `);

    var pd = this.findPathDifferences(
      lastContact.LocationId,
      thisContact.LocationId
    );
    var minpd = this.minPathDifference(pd);
    console.log(`xtdiff = ${lastDate.getTime() - thisDate.getTime()}`);
  }

  private findPathDifference(path, lastLocId, thisLocId) {
    var lastIndex = path.indexOf(lastLocId);
    var thisIndex = path.indexOf(thisLocId);
    if (lastIndex >= 0 && thisIndex >= 0) return lastIndex - thisIndex;
    return -1000; // Big difference to simplify algorithm
  }

  private findPathDifferences(lastLocId, thisLocId) {
    var retArray = [];
    var paths = this.getPaths();
    for (var i = 0; i < paths.length; i++) {
      if (lastLocId === thisLocId) {
        retArray.push(0);
      } else {
        retArray.push(this.findPathDifference(paths[i], lastLocId, thisLocId));
      }
    }
    return retArray;
  }

  private minPathDifference(pathDifferences) {
    var min = { value: 1000, index: -1 };
    for (var i = 0; i < pathDifferences.length; i++) {
      min.value = Math.min(Math.abs(pathDifferences[i]), min.value);
      if (min.value == Math.abs(pathDifferences[i])) {
        min.index = i;
      }
    }
    return min;
  }

  runTest() {
    var fish = this.getFish();
    var paths = this.getPaths();
    for (var j = 0; j < fish.length; j++) {
      var onefish = fish[j];
      onefish.Contacts = onefish.Contacts.sort((a, b) => {
        var aa = new Date(a.Start);
        var bb = new Date(b.Start);
        if (aa == bb) return 0;
        else return aa > bb ? 1 : -1;
      });
      var lastContact = onefish.Contacts[0];
      for (var i = 1; i < onefish.Contacts.length; i++) {
        var lastDate = new Date(lastContact.Start);
        var thisDate = new Date(onefish.Contacts[i].Start);
        if (thisDate < lastDate) {
          debugger;
          console.log(
            `ERROR ${lastContact.Start} ${onefish.Contacts[i].Start}`
          );
        }
        var pd = this.findPathDifferences(
          lastContact.LocationId,
          onefish.Contacts[i].LocationId
        );

        var mpd = this.minPathDifference(pd);

        if (mpd.value > 1) {
          console.log(`tdiff = ${lastDate.getTime() - thisDate.getTime()}`);
          console.log(`min = ${mpd.value}, path = ${mpd.index}`);
          this.fakeMissedContects(
            paths[mpd.index],
            lastContact,
            onefish.Contacts[i]
          );

          var msg = "";
          pd.forEach(function(element) {
            msg += ", " + element;
          });
          console.log(
            j +
              msg +
              " :: " +
              lastContact.LocationId +
              ", " +
              onefish.Contacts[i].LocationId
          );
        }

        lastContact = onefish.Contacts[i];
      }
    }
  }

  getPaths() {
    return pathsData;
  }
  getLocations() {
    return locationsData;
  }
  getFish() {
    return fishData;
  }
}
