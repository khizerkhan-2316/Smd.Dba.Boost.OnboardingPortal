import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CardComponent from '../../common/CardComponent';

const DocumentationPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const cards = [
    {
      subheading: 'Produkt-id',
      description:
        'Et unikt identifikationsnummer, der tildeles hvert produkt i feeden. Det hjælper med at adskille og spore individuelle produkter.',
    },
    {
      subheading: 'Titel',
      description:
        'Navnet eller titlen på produktet. Det skal nøjagtigt repræsentere produktet og kan indeholde maksimum 80 tegn',
    },
    {
      subheading: 'Produkt URL',
      description:
        "URL'en eller linket, der fører til den specifikke produktside på din hjemmeside eller e-handelsplatform. Det giver kunderne direkte adgang til produktet.",
    },
    {
      subheading: 'Beskrivelse',
      description:
        'Beskrivelse af produktet. Det giver yderligere kontekst for kunderne. Må maks indeholde 1000 tegn',
    },
    {
      subheading: 'Kategori',
      description:
        'Kategorien eller klassificeringen, som produktet hører under. Det hjælper med at organisere produkterne og gør det nemmere for kunderne at finde det, de leder efter.',
    },
    {
      subheading: 'Type',
      description:
        'Typen eller varianten af produktet. For eksempel, hvis du har forskellige størrelser, farver eller stilarter til et produkt, specificerer denne attribut den specifikke type.',
    },
    {
      subheading: 'Billede URL',
      description: "URL'en eller linket til produktets billede.",
    },
    {
      subheading: 'Mærke',
      description:
        'Produktets mærke eller producent. Det hjælper kunderne med at identificere produkter fra specifikke mærker.',
    },
  ];

  const files = [
    {
      subheading: 'Kategoritræ',
      description: (
        <>
          <p>
            Filen "categorytree" fungerer som en struktureret repræsentation af
            markedets struktur eller kategorihierarki. Den giver en omfattende
            oversigt over de tilgængelige kategorier på DBA. Hver kategori er
            unikt identificeret ved en kategori-ID, som fungerer som en nøgle
            til at referere til og få adgang til den tilsvarende kategori.
          </p>
          <br />
          <p>
            Ved at udnytte filen "categorytree" bliver det muligt at etablere en
            problemfri kortlægning mellem kategori-ID'er og de tilknyttede
            kategorier på DBA. Denne kortlægning muliggør effektiv indhentning
            og administration af produktinformation baseret på den specifikke
            kategori, som de tilhører.
          </p>
          <br />

          <p>
            Ved arbejde med produktdata er der tre niveauer i
            kategoristrukturen:
          </p>
          <br />

          <p>
            <b>Niveau 1:</b> Topniveaukategori.
          </p>
          <p>
            <b>Niveau 2:</b> Sammensat af niveau 1. Lidt mere specifik.
          </p>
          <p>
            <b>Niveau 3:</b> Sammensat af niveau 2. Mest specifik. Indeholder
            også et kategori-ID. Alle niveau 3-kategorier indeholder et
            kategori-ID, da produkterne er knyttet til den specifikke kategori.
          </p>
          <br />

          <p>
            Denne struktur gør det muligt at præcist placere produkter i den
            passende kategori ved at bruge kategori-ID'et. Ved at navigere
            gennem niveauerne i "categorytree" kan man finde den ønskede
            kategori baseret på specifikationerne for det pågældende produkt.
          </p>
          <br />

          <p>
            Ved at udnytte kategori-ID'et kan applikationen eller systemet let
            identificere den rigtige kategori og udføre handlinger eller opslag
            baseret på den. Dette bidrager til en mere effektiv organisering og
            præsentation af produktdata på DBA og sikrer, at produkterne vises i
            de korrekte kategorier.
          </p>
        </>
      ),
      downloadUrl: `${process.env.REACT_APP_CLIENT_BASE_URL}/assets/files/Kategori træ.xlsx`,
      downloadText: 'Download kategoritræ',
    },

    {
      subheading: 'Eksempel på XML produktfeed struktur',
      description: (
        <>
          <p>
            Produktfeedet er en XML-fil, der indeholder alle de produkter, som
            du ønsker at vise på DBA. Produktfeedet skal opdateres mindst en
            gang i døgnet, så det altid afspejler de produkter, du har på
            lageret.
          </p>
          <br />
          <p>
            XML-formatet giver en struktureret og hierarkisk repræsentation af
            produkterne og deres egenskaber. Du kan downloade et eksempel på et
            XML produktfeed ved at klikke på nedenstående link.
          </p>
        </>
      ),
      downloadUrl: `${process.env.REACT_APP_CLIENT_BASE_URL}/assets/files/examplefeed.xml`,
      downloadText: 'Download XML eksempel produktfeed',
    },

    {
      subheading: 'Eksempel på JSON produktfeed struktur',
      description: (
        <>
          <p>
            Produktfeedet er en JSON-fil, der indeholder alle de produkter, som
            du ønsker at vise på DBA. Produktfeedet skal opdateres mindst en
            gang i døgnet, så det altid afspejler de produkter, du har på
            lageret.
          </p>
          <br />
          <p>
            JSON-formatet er velegnet til strukturerede data og er nemt at læse
            og generere. Du kan downloade et eksempel på et JSON produktfeed ved
            at klikke på nedenstående link.
          </p>
          <br />
          <p>
            Hvis du vil tilføje flere billeder for hvert produkt, kan du tilføje
            en liste af billeder i produktfeedet. Se eksemplet nedenfor for at
            se, hvordan du tilføjer flere billed-URL'er til et produkt.
          </p>

          <pre>
            "images": [
            "https://www.dba.dk/images/1/1/1/1111_111111111_1111111111.jpg",
            "https://www.dba.dk/images/1/1/1/1111_111111111_1111111111.jpg" ]
          </pre>
        </>
      ),
      downloadUrl: `${process.env.REACT_APP_CLIENT_BASE_URL}/assets/files/examplefeed.json`,
      downloadText: 'Download JSON eksempel produktfeed',
    },

    {
      subheading:
        'Eksempel på CSV produktfeed struktur med komma separator/delimiter',
      description: (
        <>
          <p>
            Produktfeedet er en CSV-fil, der indeholder alle de produkter, som
            du ønsker at vise på DBA. Produktfeedet skal opdateres mindst en
            gang i døgnet, så det altid afspejler de produkter, du har på
            lageret.
          </p>
          <br />
          <p>
            CSV-formatet er et simpelt og bredt understøttet format til
            tabelbaserede data. Hver linje i CSV-filen repræsenterer et enkelt
            produkt, og hver kolonne indeholder specifik produktinformation som
            id, kategori, titel, beskrivelse, pris osv.
          </p>
          <br />
          <p>
            Hvis du ønsker at tilføje flere billeder for hvert produkt, kan du
            tilføje flere kolonner til CSV-filen, hvor hver kolonne indeholder
            en billed-URL. Du kan angive flere billeder ved at tilføje flere
            kolonner med forskellige billed-URL'er.
          </p>
          <br />
          <p>
            Bemærk: Det anbefales at sikre, at CSV-filen er korrekt formateret
            med komma som separator og at citere tekstfelter, der indeholder
            kommaer, for at undgå fejl i dataindlæsning.
          </p>
        </>
      ),
      downloadUrl: `${process.env.REACT_APP_CLIENT_BASE_URL}/assets/files/examplefeed-comma-delimter.csv`,
      downloadText: 'Download CSV eksempel produktfeed',
    },

    {
      subheading:
        'Eksempel på CSV produktfeed struktur med semikolon seperator/delimter',
      description: (
        <>
          <p>
            Produktfeedet er en CSV-fil, der indeholder alle de produkter, som
            du ønsker at vise på DBA. Produktfeedet skal opdateres mindst en
            gang i døgnet, så det altid afspejler de produkter, du har på
            lageret.
          </p>
          <br />
          <p>
            Hvis du vil tilføje flere billeder for hvert produkt kan du tilføje
            flere kolonner, hvor hver kolonne indeholde et billede url.
          </p>

          <br />
        </>
      ),

      downloadUrl: `${process.env.REACT_APP_CLIENT_BASE_URL}/assets/files/examplefeed-semicolon-delimter.csv`,
      downloadText: 'Download CSV eksempel produktfeed',
    },

    {
      subheading:
        'Eksempel på CSV produktfeed struktur med tab seperator/delimter',
      description: (
        <>
          <p>
            Produktfeedet er en CSV-fil, der indeholder alle de produkter, som
            du ønsker at vise på DBA. Produktfeedet skal opdateres mindst en
            gang i døgnet, så det altid afspejler de produkter, du har på
            lageret.
          </p>
          <br />
          <p>
            Hvis du vil tilføje flere billeder for hvert produkt kan du tilføje
            flere kolonner, hvor hver kolonne indeholde et billede url.
          </p>

          <br />
        </>
      ),

      downloadUrl: `${process.env.REACT_APP_CLIENT_BASE_URL}/assets/files/examplefeed-tab-delimter.csv`,
      downloadText: 'Download CSV eksempel produktfeed',
    },
  ];

  return (
    <div style={{ width: '95%' }}>
      <Button
        sx={{ margin: '10px 0px 10px 0px' }}
        variant="contained"
        color="primary"
        onClick={handleGoBack}
      >
        Tilbage
      </Button>

      <Typography
        variant="h6"
        sx={{ margin: '10px 0px 10px 0px' }}
        fontFamily="sans-serif"
      >
        Dokumentation
      </Typography>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'space-around',
          width: '95%',
        }}
      >
        <CardComponent
          heading="Påkrævet attributter i productfeed"
          cards={cards}
        />

        <CardComponent heading="Dokumentationsfiler" cards={files} />
      </div>
    </div>
  );
};

export default DocumentationPage;
