IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Companies]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[Companies](
    [Id] [UNIQUEIDENTIFIER] NOT NULL PRIMARY KEY,
    [CompanyName] NVARCHAR(50) NOT NULL,
    [StreetName] NVARCHAR(50) NULL,
    [PostalCode] NVARCHAR(10) NULL,
    [City] NVARCHAR(50) NULL,
    [Telephone] NVARCHAR(8) NULL,
    [Cvr] NVARCHAR(8) NULL,
    [LoginEmail] NVARCHAR(50) NULL,
    [InvoiceEmail] NVARCHAR(50) NULL
    );

END

