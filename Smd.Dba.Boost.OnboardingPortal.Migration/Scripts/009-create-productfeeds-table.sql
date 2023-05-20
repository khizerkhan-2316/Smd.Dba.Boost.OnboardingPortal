IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[ProductFeeds]') AND type in (N'U'))
BEGIN
CREATE TABLE ProductFeeds
(
    Id UNIQUEIDENTIFIER PRIMARY KEY,
    Title NVARCHAR(80) NOT NULL,
    Description NVARCHAR(1000) NULL,
    ProductFeedType NVARCHAR(10) NOT NULL,
    Url NVARCHAR(2048) NOT NULL,
    CompanyId UNIQUEIDENTIFIER NOT NULL,
    CONSTRAINT FK_ProductFeed_Companies FOREIGN KEY (CompanyId)
        REFERENCES Companies(Id)
        ON DELETE CASCADE
);
END