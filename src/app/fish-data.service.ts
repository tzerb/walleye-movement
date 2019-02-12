import { Injectable } from "@angular/core";
import { fishData, locationsData, pathsData } from "./fish-data";

@Injectable({
  providedIn: "root"
})
export class FishDataService {
  constructor() {}

  private fakeMissedContects(path, lastContact, thisContact) {
    var c = { LocationId: "", Start: "", Contacts: 0 };
    var list = [];
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
      list.push({
        LocationId: path[lastIndex + i * sign],
        Start: new Date(lastDate.getTime() + diff * i),
        Contacts: 0
      });
    }

    return list;
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

  getLocations() {
    return locationsData;
  }

  sortContacts(contacts: [any]): [any] {
    return contacts.sort((a, b) => {
      var aa = new Date(a.Start);
      var bb = new Date(b.Start);
      if (aa == bb) return 0;
      else return aa > bb ? 1 : -1;
    });
  }

  getOneFishWithMissingContactsAdded(onefish) {
    var paths = this.getPaths();
    var returnedFish = {
      Sex: onefish.Sex,
      TaggingDate: onefish.TaggingDate,
      Mature: onefish.Mature,
      Length: onefish.Length,
      FakedContacts: 0,
      Contacts: []
    };
    var fakedContacts = [];

    // Make sure the contacts are sorted
    onefish.Contacts = this.sortContacts(onefish.Contacts);
    var lastContact = onefish.Contacts[0];
    for (var i = 1; i < onefish.Contacts.length; i++) {
      var lastDate = new Date(lastContact.Start);
      var thisDate = new Date(onefish.Contacts[i].Start);
      if (thisDate < lastDate) {
        debugger;
        console.log(`ERROR ${lastContact.Start} ${onefish.Contacts[i].Start}`);
      }

      var pd = this.findPathDifferences(
        lastContact.LocationId,
        onefish.Contacts[i].LocationId
      );

      var mpd = this.minPathDifference(pd);

      if (mpd.value > 1) {
        console.log(`tdiff = ${lastDate.getTime() - thisDate.getTime()}`);
        console.log(`min = ${mpd.value}, path = ${mpd.index}`);
        fakedContacts.concat(
          this.fakeMissedContects(
            paths[mpd.index],
            lastContact,
            onefish.Contacts[i]
          )
        );
      }
      lastContact = onefish.Contacts[i];
    }
    returnedFish.Contacts = this.sortContacts(
      onefish.Contacts.concat(fakedContacts)
    );
    returnedFish.FakedContacts = fakedContacts.length;
    return returnedFish;
  }

  getFishWithMissingContactsAdded() {
    var ret = [];
    var fish = this.getFish();
    for (var j = 0; j < fish.length; j++) {
      ret[j] = this.getOneFishWithMissingContactsAdded(fish[j]);
    }
    return ret;
  }

  getSingleFish(fishId: number) {
    return this.getOneFishWithMissingContactsAdded(fishData[fishId]);
  }
  getPaths() {
    return pathsData;
  }

  getFish() {
    return fishData;
  }
}
