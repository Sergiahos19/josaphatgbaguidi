import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <span className="eyebrow">Erreur 404</span>
      <h1>Cette page n’existe pas.</h1>
      <p>Le lien suivi est peut-être incorrect ou la page a été déplacée.</p>
      <Link className="button button-primary" href="/">
        Retour à l’accueil
      </Link>
    </main>
  );
}
