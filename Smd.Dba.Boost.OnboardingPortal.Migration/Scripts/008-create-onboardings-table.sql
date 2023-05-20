IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Onboardings]') AND type in (N'U'))
BEGIN
CREATE TABLE Onboardings (
                            Id UNIQUEIDENTIFIER PRIMARY KEY,
                            CompanyId UNIQUEIDENTIFIER,
                            Step1Completed BIT NOT NULL DEFAULT 0,
                            Step2Completed BIT NOT NULL DEFAULT 0,
                            Step3Completed BIT NOT NULL DEFAULT 0,
                            Step4Completed BIT NOT NULL DEFAULT 0,
                            Step5Completed BIT NOT NULL DEFAULT 0,
                            Step6Completed BIT NOT NULL DEFAULT 0,
                            Step7Completed BIT NOT NULL DEFAULT 0,
                            OnboardingCompleted BIT NOT NULL DEFAULT 0,
                            CreatedAt DATETIME2 DEFAULT GETUTCDATE(),
                            UpdatedAt DATETIME2 DEFAULT GETUTCDATE(),

                            CONSTRAINT FK_Onboarding_Company FOREIGN KEY (CompanyId)
                                REFERENCES Companies (Id)
                                ON DELETE CASCADE
);
END
