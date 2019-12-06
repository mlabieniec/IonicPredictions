import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";



export declare class Setting {
  readonly id: string;
  readonly name: string;
  readonly value?: string;
  constructor(init: ModelInit<Setting>);
  static copyOf(source: Setting, mutator: (draft: MutableModel<Setting>) => MutableModel<Setting> | void): Setting;
}