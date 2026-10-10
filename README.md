# Portfolio de Josaphat GBAGUIDI

Portfolio personnel réalisé avec Next.js App Router, TypeScript, Tailwind CSS,
Lucide React et Motion. Le site n'utilise ni base de données ni backend : les
demandes sont préparées dans le navigateur et ouvertes dans WhatsApp.

## Démarrer le projet

```bash
npm install
npm run dev
```

Ouvrir ensuite [http://localhost:3000](http://localhost:3000).

Commandes de vérification :

```bash
npm run typecheck
npm run lint
npm run build
```

## Modifier le contenu

- Identité, e-mail, téléphone, université et filière : `src/data/profile.ts`
- Thèmes d'intérêt et compétences complémentaires : `src/data/skills.ts`
- Axes de demandes et modules pédagogiques : `src/data/services.ts`
- Conseil éditorial : `src/data/profile.ts`
- Projets documentés : `src/data/projects.ts`
- Numéro WhatsApp : `src/data/profile.ts`
- Format des messages WhatsApp : `src/lib/whatsapp.ts`

Les listes `otherSkills` et `projects` sont vides tant que des informations
réelles ne sont pas fournies ; leurs sections restent alors masquées. La photo
originale se trouve dans `images/` et sa copie de diffusion dans
`public/images/`.
