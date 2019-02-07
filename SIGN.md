# Theo-cli SIGN

## Use authorized key signature

Storing authorized key' signature along with the authorized key, let `theo-agent` to verify it before returning it to sshd.   
This will guarantee you that no one in any case will be able to inject unsolicited authorized keys and consequently get access to your server.

### Setup

First, you need to create private/public keys, we'll use `openssl`

```
openssl genrsa -aes128 -out private.pem 4096
```

It will prompt you to insert a pass phrase, memorize it!

now we need to extract from the private key the public key

```
openssl rsa -in private.pem -pubout -out public.pem
```

It will ask you the pass phrase to unlock the private key.

The public key has to be copied on all the servers where `theo-agent` will run. [See theo-agent VERIFY](https://github.com/theoapp/theo-agent/blob/master/VERIFY.md)

### Configure

To enable signing, you must set 2 variables: `THEO_PRIVATE_KEY` and `THEO_PRIVATE_KEY_PASSPHRASE`.   
You can do it in 2 ways:
 * Adding them to the environment in with theo will be executed.
 * Adding them to the config file (the first file found will be used):
   ```
    $PWD/.env
    $HOME/.theo/env
    /etc/theo/env
    ```
`THEO_PRIVATE_KEY` must point to your private key (use full path).  
`THEO_PRIVATE_KEY_PASSPHRASE` is the pass phrase to unlock the private key.

Since theo-cli 0.9.0 it's possible to pass private key path and passphrase as arguments. 

```
  --certificate, -c       Path to private key                           [string]
  --passphrase, -p        passphrase for private key                    [string]
  --passphrase-stdin, -i  read passphrase for private key from stdin   [boolean]
```

### Usage

When adding a new authorized key to a user, add the `--sign` flag

```
theo keys add john.doe@example.com \
    --sign \
    --key "ssh-rsa AAAAB3NzaC1yc2E[...]7xUw== john.doe@laptop"
```

```
theo keys add john.doe@example.com \
    --passphrase-stdin \
    --sign \
    --key "ssh-rsa AAAAB3NzaC1yc2E[...]7xUw== john.doe@laptop"
```


```
theo keys add john.doe@example.com \
    --passphrase your-passphrase \
    --sign \
    --key "ssh-rsa AAAAB3NzaC1yc2E[...]7xUw== john.doe@laptop"
```

```
theo keys add john.doe@example.com \
    --passphrase-stdin \
    --certificate $HOME/private/theo-private.pem
    --sign \
    --key "ssh-rsa AAAAB3NzaC1yc2E[...]7xUw== john.doe@laptop"
```

```
theo keys add john.doe@example.com \
    --passphrase your-passphrase \
    --certificate $HOME/private/theo-private.pem
    --sign \
    --key "ssh-rsa AAAAB3NzaC1yc2E[...]7xUw== john.doe@laptop"
```
