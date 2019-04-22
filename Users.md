# Database user models


## Studio

| Field | Type | Count | Required | Description|
| :----:|:-----| :-----| :-----|:-----|
| id | String | 1 | true |Identifier for the profile |
| username | String | 1 | true | Username for the profile |
| passwordHash | String | 1 | true | Decrypted password for the profile |
| name | String | 1 | true | Display name for the studio |
| address | String | 1 | true | Street address for the studio |
| postalCode | String | 1 | true | Postal code for the studio |
| city | String | 1 | true | City for the studio |
| country | String | 1 | true | Country for the studio |
| email | String | 1 | true | Email for the studio |
| description | String | 1 | false | Description for the studio |
| artists | String [ ] | 0...n | false | Artists id:s linked to the studio |
| images | String [ ] | 0...n | false | URL:S to images linked to the studio |
| tags | String [ ] | 0...n | false | Tags linked to the studio |

## Artist

| Field | Type | Count | Required | Description|
| :----:|:-----| :-----| :-----|:-----|
| id | String | 1 | true | Identifier for the profile |
| username | String | 1 | true | Username for the profile |
| passwordHash | String | 1 | true | Decrypted password for the profile |
| name | String | 1 | true | Display name for the artist |
| address | String | 1 | true | Street address for the artist |
| postalCode | String | 1 | true | Postal code for the artist |
| city | String | 1 | true | City for the artist |
| country | String | 1 | true | Country for the artist |
| email | String | 1 | true | Email for the artist |
| description | String | 1 | false | Description for the artist |
| studio | String  | 0..1 | false | Studio id linked to the artist |
| images | String [ ] | 0...n | false | URL:s to images linked to the artist |
| tags | String [ ] | 0...n | false | Tags linked to the artist |ta

Käyttäjiin liitetyt kuvat (images) tallennetaan tietotakantaan String tyyppisinä osoitteina, josta kuvat haetaan näytettäessä.
Tarkoituksena on projektin edetessä siirtyä käyttämään instagramin rajapintaa kuvien näyttämiseen.
