/* tslint:disable */
/* eslint-disable */
/**
 * Odysseus identity manager server
 * A service that handles all authentication processes with 2fa, uses ory hydra to handle OpenID and OAuth2 requests
 *
 * The version of the OpenAPI document: 0.7.2
 * Contact: simoneromano@tutanota.de
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * OpenID Connect address scope
 * @export
 * @interface UserInfoAddress
 */
export interface UserInfoAddress {
    /**
     * The user's country
     * @type {string}
     * @memberof UserInfoAddress
     */
    country: string;
}

export function UserInfoAddressFromJSON(json: any): UserInfoAddress {
    return UserInfoAddressFromJSONTyped(json, false);
}

export function UserInfoAddressFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserInfoAddress {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'country': json['country'],
    };
}

export function UserInfoAddressToJSON(value?: UserInfoAddress | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'country': value.country,
    };
}


