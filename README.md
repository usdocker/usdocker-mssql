# Useful script for 'Microsoft Sql Server' service

This Useful Script creates a Microsoft Sql Server based on a Docker Image.
You don't have know docker to use this solution.

## Installing

```bash
npm install -g @usdocker/usdocker # Install it first
npm install -g @usdocker/mssql
```

## Start the Microsoft Sql service

```bash
usdocker mssql up
```

## Stop the Microsoft Sql service

```bash
usdocker mssql down
```

## Check the Microsoft Sql Server status

```bash
usdocker mssql status
```


## Customize your service

You can setup the variables by using:

```bash
usdocker mssql --set variable=value
```

Default values

 - image: "microsoft/mssql-server-linux",
 - folder: "$HOME/.usdocker/data/mssql",
 - password: "Pa$$word!",
 - port: 1433

