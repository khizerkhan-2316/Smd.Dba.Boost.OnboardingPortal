IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Users]') AND type in (N'U'))
BEGIN
CREATE TABLE [dbo].[Users]
(
    [Id] [UNIQUEIDENTIFIER] NOT NULL PRIMARY KEY,
    [Username] [nvarchar](50) NOT NULL,
    [CompanyName] [nvarchar](50) NULL,
    [Email] [nvarchar](50) NOT NULL,
    [Password] [nvarchar](100) NOT NULL,
    [Cvr] [nvarchar](8) NULL,
    [RoleId] [UNIQUEIDENTIFIER] NOT NULL,
    CONSTRAINT [FK_Users_Roles] FOREIGN KEY ([RoleId]) REFERENCES [dbo].[Roles]([Id])
    )
END
