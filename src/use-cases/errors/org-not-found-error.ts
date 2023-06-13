export class OrgNotFoundError extends Error {
  constructor() {
    super("Couldn't find any Org with this city!")
  }
}
