# **Introducing Have you seen: A Digital Lifeline for Finding Missing Persons**

## **Overview**

**Have you seen** is a comprehensive platform dedicated to assisting in the search for missing persons. Built with cutting-edge fullstack technologies like NextJS, NestJS, Graphql, Postgres, Prisma, Typescript etc, this platform aims to expedite the search and recovery process, offering hope and support to families and friends in distress.

> **Disclaimer**: This is a portfolio project and not an actual service for finding missing persons.

## **Key Features**

1. **Real-Time Case Updates**: Stay updated with real-time information on ongoing cases, from police reports to community sightings.
2. **Interactive Maps**: Our interactive map features enable you to explore the last known locations, major sightings, and other essential points related to each case.
3. **User-Generated Reports**: Leverage the power of community by submitting or viewing user-generated reports, which are then verified for accuracy and relevance.
4. **Privacy Protected**: Sensitive information is only available to authorized personnel, ensuring the integrity of ongoing investigations.
5. **User-Friendly Interface**: With its intuitive UI, both law enforcement and the general public can effortlessly navigate through cases, updates, and more.

## **Who Is It For?**

- **Law Enforcement Agencies**: Get instant updates, monitor cases, and even receive leads all in one centralized system.
- **Concerned Citizens**: Actively participate in ongoing cases by submitting verified information or sharing reports on social media.
- **Families and Friends**: Easily upload information about your missing loved one, view updates, and communicate directly with law enforcement agencies involved.

## **Why Use Have you seen?**

In the harrowing experience of having a missing loved one, time is of the essence. **Have you seen** aims to increase the exposure the missing person gets from the get-go and makes gathering abundant information on the case from the public. The verified leads will then be shared with the public, generating more crucial leads from the early hours of a missing person case.

## **Improvements**

- **Valuable items**: We can add facilities to post missing items like IDs, baggages etc., along with the location they are lost.
- **Tracking criminals and criminal activities**: With enhanced security features, this application can be used by law enforcement to work with the public to track and close-in on criminal groups and their activities.
- **Security**: The stakes this application deals with are so high. So, if this is ever to be deployed for finding missing people, it should undergo rigorous testing at all levels.

## **Intuitiveness**

- On simply opening the application, with zero interaction, the public can see the cases in their area.

## **Rethinking the concept**

Sometimes it feels like this application will provide more insights to the criminals on where the police are searching. Although I have implemented private and public reports, it bothers me to think that the criminals can use this application to further make the search harder by creating false reports and evidences, thereby manipulating the public and the concerned ones.

The application can be anxiety-inducing as well. While creating a realistic demo case, it often ends up being depressing and makes me feel hopeless, looking at the vast map with endless roads from the point of last sighting.

## **Where from here?**

I, Karthick Ragavendran, worked on this comprehensive monorepo for around 200 hours and it is open source. It is uncertain if I will continue to work on this, so if this excites you, please feel free to fork it and make it more robust and feature-rich.

## **Get Started**

For local development, we use Docker Desktop. There is a docker-compose file in the `apps/api` that runs Postgres and pgAdmin.

Make sure you have Docker Desktop installed and spin up the Postgres for our application.

```
docker compose up -d
```

Install dependencies

```
yarn
```

Run them all!

```
cd apps/web
cd apps/web-officer
yarn dev
cd apps/api
yarn start:dev
```

Thank you!
