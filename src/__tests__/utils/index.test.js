import { getClassName } from "@src/utils/index";

describe("getClassName Test", () => {

  it("should return correct className", () => {
    const classMapping = {
      "classA": true,
      "classB": false,
      "classC": true,
      "classD": false,
    };

    expect(getClassName(classMapping)).toBe(" classA classC");
  });

});
