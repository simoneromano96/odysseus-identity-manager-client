/* tslint:disable */
/* eslint-disable */
/**
 * Odysseus identity manager server
 * A service that handles all authentication processes with 2fa, uses ory hydra to handle OpenID and OAuth2 requests
 *
 * The version of the OpenAPI document: 0.7.1-alpha.5
 * Contact: simoneromano@tutanota.de
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface AcceptedRequest
 */
export interface AcceptedRequest {
    /**
     * RedirectURL is the URL which you should redirect the user to once the authentication process is completed.
     * @type {string}
     * @memberof AcceptedRequest
     */
    redirectTo: string;
}

export function AcceptedRequestFromJSON(json: any): AcceptedRequest {
    return AcceptedRequestFromJSONTyped(json, false);
}

export function AcceptedRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): AcceptedRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'redirectTo': json['redirect_to'],
    };
}

export function AcceptedRequestToJSON(value?: AcceptedRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'redirect_to': value.redirectTo,
    };
}

