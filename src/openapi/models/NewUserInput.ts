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
 * New user input data
 * @export
 * @interface NewUserInput
 */
export interface NewUserInput {
    /**
     * User email, must be unique.
     * @type {string}
     * @memberof NewUserInput
     */
    email: string;
    /**
     * The new user password.
     * @type {string}
     * @memberof NewUserInput
     */
    password: string;
    /**
     * The new user username.
     * @type {string}
     * @memberof NewUserInput
     */
    username?: string;
}

export function NewUserInputFromJSON(json: any): NewUserInput {
    return NewUserInputFromJSONTyped(json, false);
}

export function NewUserInputFromJSONTyped(json: any, ignoreDiscriminator: boolean): NewUserInput {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'email': json['email'],
        'password': json['password'],
        'username': !exists(json, 'username') ? undefined : json['username'],
    };
}

export function NewUserInputToJSON(value?: NewUserInput | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'email': value.email,
        'password': value.password,
        'username': value.username,
    };
}


