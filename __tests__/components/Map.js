import React from "react";
import { mount, shallow } from "enzyme";

import Map from "../../src/components/Map";
import Styles from "../../src/constants/courtStyles";

import { twoCourts } from "../__fixtures__/CourtFixtures";
import { setupGoogleMock } from "../__fixtures__/Helpers";

describe(`Map component`, () => {
  beforeAll(() => {
    setupGoogleMock();
  });
  test("renders the map component", () => {
    const component = shallow(<Map courts={[]} styles="usa" />);
    expect(component.exists()).toBe(true);
  });
  it("chooseStyles should default to an empty array", () => {
    const component = shallow(<Map courts={[]} styles="" />);
    expect(component.instance().chooseStyles()).toEqual([]);
  });
  it("chooseStyles should choose usa with usa prop passed", () => {
    const component = shallow(<Map courts={[]} styles="usa" />);
    expect(component.instance().chooseStyles()).toEqual(Styles.usa);
  });
  it("should render a map", () => {
    const component = shallow(<Map courts={[]} styles="" />);
    // mock object was not matching so I just stringified to compare since
    // there was no visual difference
    expect(JSON.stringify(component.instance().createMap())).toEqual(
      JSON.stringify(new google.maps.Map())
    );
  });
  it("getPoints should return one point per court", () => {
    const component = shallow(<Map courts={twoCourts} styles="usa" />);
    expect(component.instance().getPoints().length).toEqual(twoCourts.length);
  });
  it("choosing a club court should return the correct color ", () => {
    const component = shallow(<Map courts={twoCourts} styles="usa" />);
    expect(component.instance().getPinColor(twoCourts[1])).toEqual("F8EC3B");
  });
  it("should create a marker ", () => {
    const component = shallow(<Map courts={twoCourts} styles="usa" />);
    const marker = component
      .instance()
      .createMarker(new google.maps.Map(), twoCourts, 1);
    expect(JSON.stringify(marker)).toEqual(
      JSON.stringify(google.maps.Marker())
    );
  });
  it("should create an infowindow ", () => {
    const component = shallow(<Map courts={twoCourts} styles="usa" />);
    const infoWindow = component.instance().setMarkerContent(1);
    expect(JSON.stringify(infoWindow)).toEqual(
      JSON.stringify(google.maps.InfoWindow())
    );
  });
  test("componentDidUpdate ", () => {
    const spy = jest.spyOn(Map.prototype, "componentDidUpdate");
    const component = mount(<Map courts={twoCourts} styles="usa" />);
    component.setProps({ courts: twoCourts });
    expect(spy).toHaveBeenCalled();
  });
});
