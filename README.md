# Meetup

[![Tests](https://github.com/PelleLindroth/meetup/actions/workflows/tests.yml/badge.svg)](https://github.com/PelleLindroth/meetup/actions/workflows/tests.yml)

**Inlämningsuppgift för Designprinciper och Designmönster, ITHS Stockholm 2021**</br>
av Pelle Lindroth

<hr>

**Publicerad app:**
https://meetup-e53f4.firebaseapp.com/

Seedas med fyra users och sex meetups. Inloggad user och ändringar i meetups sparas i localStorage.

**Inloggningar**

1. Email: tjalle@yahoo.com<br/>
   Password: grillkorv
2. Email: kenta@yahoo.com<br/>
   Password: bananpaj
3. Email: babsan@yahoo.com<br/>
   Password: password123
4. Email: loffe@yahoo.com<br/>
   Password: storstark

**Ställa in tid:**<br/>
Riktig tid används som default. Klicka på bannern under Headern för att ställa in valfri tid

**Test med verbose och coverage:**<br/>
```npm run test:full```

<hr>

## **User stories**
### Alla användare
- Som en användare vill jag<br/>
**<em>se en kronologisk lista över kommande och tidigare evenemang</em>**<br/>
så att jag kan<br/>
**<em>få en överblick över vad som är på gång och vad som hänt på senaste tiden</em>**

- Som en användare vill jag<br/>
**<em>kunna klicka på ett evenemang för att se fler detaljer</em>**<br/>
så att jag kan<br/>
**<em>bilda mig en tydligare uppfattning om evenemanget</em>**

- Som en användare vill jag<br/> 
**<em>tydligt kunna se vilka evenemang som redan ägt rum</em>**<br/>
så att jag inte behöver<br/>
**<em>titta på varje evenemangs datum</em>**

- Som en användare vill jag<br/> 
**<em>kunna filtrera och söka bland evenemang</em>**<br/>
så att jag<br/>
**<em>lättare kan hitta evenemang som intresserar mig</em>**

- Som en användare vill jag<br/>
**<em>kunna kommentera evenemang</em>**<br/>
så att jag kan<br/>
**<em>uttrycka min åsikt och diskutera evenemanget med andra intresserade användare</em>**

- Som en användare vill jag<br/> 
**<em>kunna logga in</em>**<br/>
så att jag kan<br/> 
**<em>få utökad funktionalitet i appen</em>**

### Inloggade användare
- Som en inloggad användare vill jag<br/>
**<em>kunna betygsätta evenmang jag deltagit i</em>**<br/>
så att jag kan<br/>
**<em>lämna feedback till arrangören</em>**

- Som en inloggad användare vill jag<br/> 
**<em>kunna anmäla mig till evenemang</em>**<br/>
så att jag kan<br/>
**<em>låta arrangören veta att jag kommer och själv hålla reda på evenemanget</em>**

- Som en inloggad användare vill jag<br/>
**<em>kunna skapa mina egna evenemang</em>**<br/>
så att jag kan<br/>
**<em>visa det för andra användare som kan tänkas vara intresserade</em>**

- Som en inloggad användare vill jag<br/>
**<em>kunnna logga ut</em>**<br/>
så att jag kan<br/>
**<em>logga in med ett annat konto</em>**
<hr>

## **Use Case Diagram**

![Alt text](/src/assets/meetup_ucdiagram.png?raw=true "Use case diagram for Meetup app")
