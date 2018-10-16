## Theo CLI

[![npm version](https://badge.fury.io/js/theoapp-cli.svg)](https://www.npmjs.com/package/theoapp-cli)

CLI app to manage [Theo server](https://github.com/theoapp/theo-node)

### Summary

- [Install](#install)
- [Usage](#usage)
  - [Accounts](#accounts)
  - [SSH Keys](#ssh-keys)
  - [Permissions](#permissions)
- [Examples](#examples)

#### Install

`$ npm i -g theoapp-cli`

`theo` needs 2 variables to work: `THEO_URL` and `THEO_TOKEN`.   
They can be set as environment variables:

`THEO_URL=https://your.server.name THEO_TOKEN=your_secret_admin_token theo accounts list` 

Or they can be stored in a file:

```
THEO_URL=https://your.server.name
THEO_TOKEN=your_secret_admin_token
```

`theo` will look (in this order):

```
  $PWD/.env
  $HOME/.theo-cli/env
  /etc/theo-cli/env
```


#### Usage

##### Accounts

```
theo accounts <command>

Manage accounts

Commands:
  main.js accounts add [options]        Create account
  main.js accounts create [options]     Create account
  main.js accounts rm <id>              Remove account
  main.js accounts edit <id> [options]  Edit account
  main.js accounts get <id>             Get account
  main.js accounts list                 List accounts
  main.js accounts search               Search accounts
```
* List

```
theo accounts list

List accounts

Options:
  --version     Show version number                                    [boolean]
  --help        Show help                                              [boolean]
  --limit, -l   Number of accounts to retrieve                          [number]
  --offset, -o  Offset of the query                                     [number]
```

* Search

```
theo accounts search

Search accounts

Options:
  --version     Show version number                                    [boolean]
  --help        Show help                                              [boolean]
  --name, -n    Account name                                            [string]
  --email, -e   Account email                                           [string]
  --limit, -l   Number of accounts to retrieve                          [number]
  --offset, -o  Offset of the query                                     [number]
```

* Get

```
theo accounts get <id>

Get account

Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]
``` 

* Add/Create
 
 ```
 theo accounts add [options]
 
 Create account
 
 Options:
   --version    Show version number                                     [boolean]
   --help       Show help                                               [boolean]
   --name, -n   Account name                                  [string] [required]
   --email, -e  Account email                                 [string] [required]
   --key, -k    Account public key (accept multiple keys)                [string]
 ```
 
 * Edit
 
 ```
 theo accounts edit <id> [options]
 
 Edit account
 
 Options:
   --version      Show version number                                   [boolean]
   --help         Show help                                             [boolean]
   --enable, -e   Enable Account                                        [boolean]
   --disable, -d  Disable Account                                       [boolean]
 ```

* Remove

```
theo accounts rm <id>

Remove account

Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]
```

##### SSH Keys

```
theo keys <command>

Manage accounts' keys

Commands:
  main.js keys add <account> [options]     Add key to account
  main.js keys import <account> [options]  Imporrt keys to account from a
                                           service (github/gitlab)
  main.js keys rm <account> [options]      Remove key from account
```

* Add

```
theo keys add <account> [options]

Add key to account

Options:
  --version  Show version number                                       [boolean]
  --help     Show help                                                 [boolean]
  --key, -k  Public ssh key                                           [required]
```

* Import 

```
theo keys import <account> [options]

Imporrt keys to account from a service (github/gitlab)

Options:
  --version       Show version number                                  [boolean]
  --help          Show help                                            [boolean]
  --service, -s   Service to import from                     [string] [required]
  --username, -u  Service's username                         [string] [required]
```

* Remove

```
theo keys rm <account> [options]
     
     Remove key from account
     
     Options:
       --version  Show version number                                       [boolean]
       --help     Show help                                                 [boolean]
       --key, -k  Public ssh key ID                                        [required]
```

##### Permissions

```
theo permissions <command>

Manage accounts' permissions

Commands:
  main.js permissions add <account>         Add permission to account         [options]
  main.js permissions rm <account>          Remove permission from account    [options]
```

* Add

```
theo permissions add <account> [options]
     
     Add permission to account
     
     Options:
       --version   Show version number                                      [boolean]
       --help      Show help                                                [boolean]
       --host, -h  Host name                                               [required]
       --user, -u  User name                                               [required]
```

* Remove 

```
theo permissions rm <account> [options]
     
     Remove permission from account
     
     Options:
       --version         Show version number                                [boolean]
       --help            Show help                                          [boolean]
       --permission, -p  Permission ID                                     [required]
```

#### Examples

To create a new account with name _john.doe_ and email _john.doe@sample.com_

```
$ THEO_URL=http://localhost:9100 THEO_TOKEN=12345 theo \
    accounts add \
    --name john.doe \
    --email john.doe@sample.com

+---------------------------------+
{
   "id": 1,
   "name": "john.doe",
   "email": "john.doe@sample.com",
   "active": 1,
   "public_keys": [],
   "permissions": []
}
+---------------------------------+
```

To add a new key to account _john.doe_ (Id 1):

```
$ THEO_URL=http://localhost:9100 THEO_TOKEN=12345 theo \
    keys add 1 \
    -k "ssh-rsa AAAAB3N[.....]lS03D7xUw== john.doe@localhost"

  +--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
  {
     "account_id": "1",
     "keys": [
        {
           "key": "ssh-rsa AAAAB3N[.....]lS03D7xUw== john.doe@localhost"
        }
     ]
  }
  +--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
```

To import `John Doe`'s public keys from his github account (which is `jdoe80`):

```
THEO_URL=http://localhost:9100 THEO_TOKEN=12345 theo \
    keys import 1 -s github -u jdoe80
    
    
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
{
   "account_id": 1,
   "public_keys": [
      {
         "id": 8,
         "public_key": "ssh-rsa AAAAB3[....]aRcd099sfCzz"
      },
      {
         "id": 9,
         "public_key": "ssh-rsa AAAAB3[.....]lSasfd3ds=="
      }
   ]
}
+-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------+
```

To add a new permission to _john.doe_ to let him login as user `ubuntu` to host `srv-sample-01`

```
THEO_URL=http://localhost:9100 THEO_TOKEN=12345 theo \
    permissions add 1 \
    --host srv-sample-01 \
    --user ubuntu

+--------------------+
{
   "account_id": "1"
}
+--------------------+
```

To give permission to login as user `ubuntu` on all the servers named `test-xxxx`:
 
```
THEO_URL=http://localhost:9100 THEO_TOKEN=12345 theo \
    permissions add 1 \
    --host "test-%" \
    --user ubuntu
```

