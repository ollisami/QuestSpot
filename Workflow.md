# Workflow
## Uuden taskin luominen:
- Luo Trelloon uusi kortti joko TODO-Frontend tai TODO-Backend kolumniin, tehtävästä riippuen
- Anna kortille mahdollisimman tarkka kuvaus

## Taskin toteuttaminen:
- Valitse Trello:ssa haluamasi taski, siirrä se "In Development" sarakkeeseen ja aseta itsesi jäseneksi kortille.
- Varmista että olet master branchissa, eikä koneellasi ole mitään localeja muutoksia (**git status** sanoo "nothing to commit, working tree clean")
- Pullaa uusin master (**git pull**)
- luo uusi branchi ja nimeä se frontend/tehtava_jota_olet_tekemassa tai backend/tehtava_jota_olet_tekemassa,  
esim: **git checkout -b "frontend/uusi_hieno_ominaisuus"**
- On suositeltavaa kirjoittaa uuden branchin nimi Trello kortin kommenttiin jo heti tässä vaiheessa
- Tee muutokset, varmista että ne toimivat halutulla tavalla ja mikään vanha toiminallisuus ei hajoa
- Tarkista että koodisi on siistiä ja ES-Lint ei anna mitään virheitä
- puske muutoksesi **git push**. HUOM! VARMISTA ETTÄ OLET OIKEASSA BRANCHISSÄ! ÄLÄ PUSKE SUORAAN MASTERIIN!
- Siirrä Trello kortti "Testing" sarakkeeseen. Jos et vielä kirjoittanut korttiin branchin nimeä, tee se viimeistään nyt.  
Kommenttiin kannattaa kirjoittaa myös esim "Ready for Testing" tjsp, se auttaa ylläpitämään kortin tilaa. Poista itsesi kortin jäsenistä.
- Merkkaa käytetty aika tuntikirjanpitoon ja halutessasi ilmoita tehtävän valmistumisesta esim telegramissa.

## Taskin testaus:
- Valitse testattava taski Trellon Testing sarakkeesta ja merkitse itsesi jäseneksi kortille, jotta muut näkevät että tehtävä on työn alla.
- Varmista että koneellasi ei ole localeja muutoksia, varmista että olet master branchissä ja pullaa uusin master (**git pull**)
- Vaihda branchiksi testattava branchi, esim **git checkout frontend/taski_jota_testaat**
- Mergeä uusin masteri branchiin: **git merge master**
- Lue tarkasti läpi branchin muutokset, joko terminaalissa **git diff** tai selaimella githubissa.
- Onko koodi toimivaa ja siististi toteutettua? Toimiiko ominaisuus aina kuten on toivottu, myös erikoistilanteissa?  
- Tarkista  että ES-Lint ei anna mitään virheitä
- **Jos löysit koodista korjattavaa**: kirjoita korjattavat asiat Trello kortin kommentti kohtaan. Pyri kommentoimaan mahdollisimman tarkasti mitä 
tulisi korjata ja voit jopa vinkata mahdolliset korjausehdotukset suoraan kommenttiin. Siirrä kortti "In development" sarakkeeseen ja poista itsesi kortin jäsenistä.
Voi olla järkevää mainita taskin tekijälle asiasta vielä esim. telegramissa.
- **Jos mitään korjattavaa ei löytynyt:** Siirry master branchiin (**git checkout master**). Mergeä muutokset sisältävä branchi,
esim: **git merge frontend/taski_jota_testaat**. Tässä vaiheessa kannattaa vielä kerran kokeilla että kaikki toimii. Puske muutokset **git push**.
- Kirjoita Trellon kommenttikenttään joku viesti testien läpäisystä, esim. "Tested and merged" ja siirrä taski "DONE" kolumniin.
- Muista kirjoittaa tuntisi tuntikirjanpitoon.