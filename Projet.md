# OBJECTIF
Créer un design frontend complet et personnalisable d’un dashboard modulaire, adaptable à tout type de site ou application web (SaaS, plateforme admin, CRM, etc.), avec prise en charge du thème clair et sombre.

# STRUCTURE GÉNÉRALE
- Interface responsive (desktop, tablette, mobile)
- Sidebar verticale avec navigation persistante (icônes + labels)
- Topbar avec recherche, langue, avatar utilisateur, notifications
- Zone principale avec des widgets réarrangeables (drag & drop)
- Support du mode clair / sombre
- Layout extensible (ajout/suppression de modules à volonté)

# MODULES À INCLURE
- **Analytics** : Graphiques dynamiques (chart.js ou ApexCharts), KPI (visiteurs, conversions)
- **Users** : Tableau utilisateurs (nom, rôle, statut, actions : modifier, supprimer)
- **Emails** : Statistiques emails (envoyés, ouverts, cliqués), boîte de réception simplifiée
- **Feedbacks** : Liste de feedbacks utilisateur avec note (étoiles) et commentaires
- **Notifications** : Fil de notifications (en temps réel si possible), avec actions rapides
- **Payments** : Vue des paiements, factures, intégration Stripe, revenus mensuels
- **Calendrier** : Calendrier interactif (vue jour/semaine/mois), événements personnalisables
- **Abonnements** : Détail des abonnements, gestion du renouvellement, statuts
- **Chats** : Messagerie intégrée avec threads, groupes, état en ligne
- **APIs Externes** : Connexions API, état des services, logs d’appel API
- **Monitoring** : Statut système, uptime, logs serveur, alertes critiques
- **Langues** : Sélecteur de langue global, gestion multilingue pour tout le dashboard
- **Settings** : Configuration du dashboard (thème, permissions, préférences perso)

# DESIGN SYSTEM
- Utiliser Shadcn + TailwindCSS pour la rapidité et la personnalisation
- Icônes via HeroIcons
- Boutons, champs, et composants cohérents entre les modules
- Composants accessibles (a11y), responsive et stylés

# UX/UI
- Design épuré, intuitif
- Transitions douces entre les modules
- Gestion dynamique des modules (drag & drop pour réorganisation)
- Feedback visuel sur toutes les actions utilisateur

# TECHNOLOGIES CIBLÉES
- Compatible avec React
- Intégration potentielle dans des projets existants
- Scalable pour ajout de modules futurs
