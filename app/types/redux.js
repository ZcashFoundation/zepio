// @flow

type State = {| |};

export type Action = { type: $Subtype<string>, payload: Object };
export type GetState = () => State;
export type Dispatch = (action: Action) => any;
