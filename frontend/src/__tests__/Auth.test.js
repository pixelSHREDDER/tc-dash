/*import React from "react";
import { create } from "react-test-renderer";
//import Users from "../Auth";
import Instance from "../Instance/Instance";
import axios from "axios";

jest.mock("axios");

describe("Instance component", () => {
    it("shows an instance", async () => {
        const response = {
            data: [{ name: "Kevin Mitnick" }, { name: "Valentino Gagliardi" }]
        };
        axios.get.mockResolvedValue(response);
        const component = create(<Instance />);
        const instance = component.getInstance();
        await instance.componentDidMount();
        console.log(instance.state); // << HERE IS THE SNITCH!
  });
});*/