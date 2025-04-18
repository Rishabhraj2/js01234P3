# js01234P3

server >> Storing certain book data
       >> User Resister
       >>Subscribe


This is a book recoard managenment API Server / Backend for the library system or managenment of recoards or manuals or books

Fine System:
User:06/03/2023-06/06/2023
09/06/2023 => 50*3=150/-

3 months  (Basic)
6 months  (Standard)
12 months  (Premium)

if the subscription type is standard && if the subscription date is 06/03/2023
>> than subscription valid till 06/09/

within subscription date >> if we miss the renewal >> 50/- day
subscription date is also been missed>> and also missed the renewal >> 100 +50/- day


>>book1
>> basic 
>> 06/03/2023 -> subscription date
>> 07/03/2023 -> borrowed a book from library
>> book1 renewable date is on 21/03/2023
>> 23/03/2023 -> we need to pay a fine of 50*2=100-/



>>book1
>> basic 
>> 06/03/2023 -> subscription date
>> 07/03/2023 -> borrowed a book from library
>> book1 renewable date is on 21/03/2023
>> 23/03/2023 -> we need to pay a fine of 100+(no of day *50)

missed by renewable date>> 50-/
missed by subscription date >> 100-/
missed by renewable && subscription date >>150-/



# Routs and Endpoints

## /users
POST:Create a new user
GET : Get all the user info here

## /users/(id)
GET:Get a user by id
PUT:Update a user by their ID
DELETE:Delete a user by id (chk if he/she still have an issued book) & (is there any fine to paid)

## /users/subscription-derails/{id}
GET:Get user subscription derails
>> Date of Subscriotion derails
>> Valid till
>> Is there any fine

## /books
GET:Get all the books
POST:Update a book by id


## /books/issued
GET: Get all issued books

## /books/issued/whitefine
GET:Get all issued books with their fine

## npm init
## npm i nodemon --save dev
## npm run dev
## Router





each
 "name":"jane",
        "surename":"Doe",
        "email":"user@gmail.com",
        "subscriptionType":"premium",
        "subscriptionDate":"04/01/2022"




...data        {
  "data":{
   ## "name":"Rishabh",
   ## "surname":"Raj"
  }
}


name :"rishabh"
name:"devton"
email:"user@gmail.com
suscription:"primium"



  const index=users.indexOf(user);
  users.splice(index,1)



  var class=["six","seven","eighr"];
  indexof()
  class.indexOf("seven")
  1