IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[ContactPersons]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[ContactPersons]
(
    [Id] [UNIQUEIDENTIFIER] NOT NULL PRIMARY KEY,
    [Name] [nvarchar](50) NOT NULL,
    [Email] [nvarchar](50) NOT NULL,
    [Telephone] [nvarchar](8) NOT NULL,
    [CompanyId] [UNIQUEIDENTIFIER] NOT NULL,
    CONSTRAINT [FK_ContactPersons_Companies] FOREIGN KEY ([CompanyId]) REFERENCES [dbo].[Companies]([Id]) ON DELETE CASCADE,
)
END