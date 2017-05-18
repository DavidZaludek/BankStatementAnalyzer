# Bank statement analyzer

This repository was created to store text, sources and build of my application that was developed as part of my bachelors thesis.

## Features :

Application analyzes bank statements and creates charts to represent the data. 

Currently supported banks are :

- FIO CZ
- VUB SK

## Installation :

Download build and run index.html. 

## Testing :

In test/bankFiles you can find bank statements in supported formats for each bank. These can be used for testing of different charts and file manager.

## Use case : 

### New user
- Sign up for an account 
- Upload files
- Select chart to display
- Log out

## DISCLAIMER
- Application stores user data in IndexedDB so user data is not reachable cross browser unless web server is implemented with its own database.
- Application downloads rates from Open Exchange Rates if its not awailable it uses last stored rates.

