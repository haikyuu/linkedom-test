export interface ValidationError {
  loc: string[];
  msg: string;
  type: string;
}

export function parseError(
  errors: ValidationError[],
  valueMap?: Record<string, string>
) {
  // error handling has different use cases:
  // - notification message: one line message to show the user
  // - single form message: password reset, enable internet pause, login
  // - complex form: multiple inputs -> display an error below each input
  // To handle all those cases, we should return an array of messages
  // But we don't have any complex forms for now.
  // We will instead return a single string
  return errors.map(({ loc, msg, type }) => {
    const field = loc[loc.length - 1];
    let fieldName = "";
    if (field && valueMap && valueMap[field]) {
      fieldName = valueMap[field]! + " ";
    }
    return `${fieldName}Error: ${msg}`;
  });
}
