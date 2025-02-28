# DraftIO

Chicos, lean las cartas

## Como branchear

 Vamos a tener dos branches, `main` y `develop`.
 * `main` es la branch "productiva", y nadie puede pushear directo.
 * `develop` es la branch de desarrollo. Se puede pushear directo (pero no es recomendado)

Entonces el flujo es así:

creo una branch para trabajar, la llamo `como_quiero`. Cuando termino de laburar, creo un pr que va de `como_quiero` a `develop`.

Luego de una semana o dos, siempre es bueno dejar `main` al dia con `develop`. Eso se hace con un pr que va de `develop` a `main`. Sin borrar la branch.

Con eso tenes un flujo de trabajo donde>

* main siempre tiene lo que anda
* develop siempre tiene lo ultimo que se probo
* otras branches tiene lo ultimo que puede andar o no


## Next.js App Router Course - Starter

This is the starter template for the Next.js App Router Course. It contains the starting code for the dashboard application.

For more information, see the [course curriculum](https://nextjs.org/learn) on the Next.js Website.
