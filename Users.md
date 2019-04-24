# Database user models


## Profile

| Field | Type | Count | Required | Description|
| :----:|:-----| :-----| :-----|:-----|
| type | String | 1 | true |Type of the profile (Studio or Artist). Type "Basic" will be added later for customers |
| id | String | 1 | true |Identifier for the profile |
| username | String | 1 | true | Username for the profile |
| passwordHash | String | 1 | true | Decrypted password for the profile |
| name | String | 1 | true (studio & artist) | Display name for the profile |
| address | String | 1 | true (studio & artist)| Street address for the profile |
| postalCode | String | 1 | true (studio & artist) | Postal code for the profile |
| city | String | 1 | true (studio & artist)| City for the profile |
| country | String | 1 | true (studio & artist)| Country for the profile |
| email | String | 1 | true | Email for the profile |
| description | String | 1 | false | Description for the profile |
| likes | String[] | 0...n | false | ID:s of profiles that liked this profile (studio & artist) |
| studio | String  | 0..1 | false | Studio id linked to the profile (artist only) |
| artists | String [ ] | 0...n | false | Artists id:s linked to the profile (studio only) |
| images | String [ ] | 0...n | false | URL:S to images linked to the profile (studio & artist) |
| tags | String [ ] | 0...n | false | Tags linked to the profile (studio & artist) |


Käyttäjiin liitetyt kuvat (images) tallennetaan tietotakantaan String tyyppisinä osoitteina, josta kuvat haetaan näytettäessä.
Tarkoituksena on projektin edetessä siirtyä käyttämään instagramin rajapintaa kuvien näyttämiseen.
