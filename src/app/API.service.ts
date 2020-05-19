/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.
import { Injectable } from "@angular/core";
import API, { graphqlOperation } from "@aws-amplify/api";
import { GraphQLResult } from "@aws-amplify/api/lib/types";
import * as Observable from "zen-observable";

export type CreateSettingInput = {
  id?: string | null;
  name: string;
  value?: string | null;
};

export type ModelSettingConditionInput = {
  name?: ModelStringInput | null;
  value?: ModelStringInput | null;
  and?: Array<ModelSettingConditionInput | null> | null;
  or?: Array<ModelSettingConditionInput | null> | null;
  not?: ModelSettingConditionInput | null;
};

export type ModelStringInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null"
}

export type ModelSizeInput = {
  ne?: number | null;
  eq?: number | null;
  le?: number | null;
  lt?: number | null;
  ge?: number | null;
  gt?: number | null;
  between?: Array<number | null> | null;
};

export type UpdateSettingInput = {
  id: string;
  name?: string | null;
  value?: string | null;
};

export type DeleteSettingInput = {
  id?: string | null;
};

export type ModelSettingFilterInput = {
  id?: ModelIDInput | null;
  name?: ModelStringInput | null;
  value?: ModelStringInput | null;
  and?: Array<ModelSettingFilterInput | null> | null;
  or?: Array<ModelSettingFilterInput | null> | null;
  not?: ModelSettingFilterInput | null;
};

export type ModelIDInput = {
  ne?: string | null;
  eq?: string | null;
  le?: string | null;
  lt?: string | null;
  ge?: string | null;
  gt?: string | null;
  contains?: string | null;
  notContains?: string | null;
  between?: Array<string | null> | null;
  beginsWith?: string | null;
  attributeExists?: boolean | null;
  attributeType?: ModelAttributeTypes | null;
  size?: ModelSizeInput | null;
};

export type CreateSettingMutation = {
  __typename: "Setting";
  id: string;
  name: string;
  value: string | null;
};

export type UpdateSettingMutation = {
  __typename: "Setting";
  id: string;
  name: string;
  value: string | null;
};

export type DeleteSettingMutation = {
  __typename: "Setting";
  id: string;
  name: string;
  value: string | null;
};

export type GetSettingQuery = {
  __typename: "Setting";
  id: string;
  name: string;
  value: string | null;
};

export type ListSettingsQuery = {
  __typename: "ModelSettingConnection";
  items: Array<{
    __typename: "Setting";
    id: string;
    name: string;
    value: string | null;
  } | null> | null;
  nextToken: string | null;
};

export type OnCreateSettingSubscription = {
  __typename: "Setting";
  id: string;
  name: string;
  value: string | null;
};

export type OnUpdateSettingSubscription = {
  __typename: "Setting";
  id: string;
  name: string;
  value: string | null;
};

export type OnDeleteSettingSubscription = {
  __typename: "Setting";
  id: string;
  name: string;
  value: string | null;
};

@Injectable({
  providedIn: "root"
})
export class APIService {
  async CreateSetting(
    input: CreateSettingInput,
    condition?: ModelSettingConditionInput
  ): Promise<CreateSettingMutation> {
    const statement = `mutation CreateSetting($input: CreateSettingInput!, $condition: ModelSettingConditionInput) {
        createSetting(input: $input, condition: $condition) {
          __typename
          id
          name
          value
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <CreateSettingMutation>response.data.createSetting;
  }
  async UpdateSetting(
    input: UpdateSettingInput,
    condition?: ModelSettingConditionInput
  ): Promise<UpdateSettingMutation> {
    const statement = `mutation UpdateSetting($input: UpdateSettingInput!, $condition: ModelSettingConditionInput) {
        updateSetting(input: $input, condition: $condition) {
          __typename
          id
          name
          value
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <UpdateSettingMutation>response.data.updateSetting;
  }
  async DeleteSetting(
    input: DeleteSettingInput,
    condition?: ModelSettingConditionInput
  ): Promise<DeleteSettingMutation> {
    const statement = `mutation DeleteSetting($input: DeleteSettingInput!, $condition: ModelSettingConditionInput) {
        deleteSetting(input: $input, condition: $condition) {
          __typename
          id
          name
          value
        }
      }`;
    const gqlAPIServiceArguments: any = {
      input
    };
    if (condition) {
      gqlAPIServiceArguments.condition = condition;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <DeleteSettingMutation>response.data.deleteSetting;
  }
  async GetSetting(id: string): Promise<GetSettingQuery> {
    const statement = `query GetSetting($id: ID!) {
        getSetting(id: $id) {
          __typename
          id
          name
          value
        }
      }`;
    const gqlAPIServiceArguments: any = {
      id
    };
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <GetSettingQuery>response.data.getSetting;
  }
  async ListSettings(
    filter?: ModelSettingFilterInput,
    limit?: number,
    nextToken?: string
  ): Promise<ListSettingsQuery> {
    const statement = `query ListSettings($filter: ModelSettingFilterInput, $limit: Int, $nextToken: String) {
        listSettings(filter: $filter, limit: $limit, nextToken: $nextToken) {
          __typename
          items {
            __typename
            id
            name
            value
          }
          nextToken
        }
      }`;
    const gqlAPIServiceArguments: any = {};
    if (filter) {
      gqlAPIServiceArguments.filter = filter;
    }
    if (limit) {
      gqlAPIServiceArguments.limit = limit;
    }
    if (nextToken) {
      gqlAPIServiceArguments.nextToken = nextToken;
    }
    const response = (await API.graphql(
      graphqlOperation(statement, gqlAPIServiceArguments)
    )) as any;
    return <ListSettingsQuery>response.data.listSettings;
  }
  OnCreateSettingListener: Observable<
    OnCreateSettingSubscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnCreateSetting {
        onCreateSetting {
          __typename
          id
          name
          value
        }
      }`
    )
  ) as Observable<OnCreateSettingSubscription>;

  OnUpdateSettingListener: Observable<
    OnUpdateSettingSubscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnUpdateSetting {
        onUpdateSetting {
          __typename
          id
          name
          value
        }
      }`
    )
  ) as Observable<OnUpdateSettingSubscription>;

  OnDeleteSettingListener: Observable<
    OnDeleteSettingSubscription
  > = API.graphql(
    graphqlOperation(
      `subscription OnDeleteSetting {
        onDeleteSetting {
          __typename
          id
          name
          value
        }
      }`
    )
  ) as Observable<OnDeleteSettingSubscription>;
}
