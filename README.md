# Array extension

- Projection
    - [toArray](#toarray)
    - [toJson](#tojson)
    - [select](#select)
    - [selectMany](#selectmany)
    - [firstOrDefault](#firstordefault)
    - [lastOrDefault](#lastordefault)
    - [groupBy](#groupby)
    - [elementAtOrDefault](#elementatordefault)
    - [countBy](#countby)
    - [distinct](#distinct)
    - [distinctBy](#distinctby)
    - [zip](#zip)
    - [union](#union)
    - [unionBy](#unionby)

- filtre
    - [where](#where)
    - [whereOr](#whereor)
    - [take](#take)
    - [takeLast](#takelast)
    - [skip](#skip)
    - [skipLast](#skiplast)
    - [orderBy](#orderby)
    - [orderByDesc](#orderbydesc)

- Verification
    - [all](#all)
    - [any](#any)

- Opération
    - [sum](#sum)
    - [min](#min)
    - [minBy](#minby)
    - [max](#max)
    - [maxBy](#maxby)
    - [average](#average)

- Ecriture
    - [insert](#insert)
    - [remove](#remove)
    - [update](#update)
    - [updateMany](#updatemany)
    - [range](#range)
    - [repeat](#repeat)

## where

Ajouter un filtre `AND` logique
**ATTENTION** Les filtres ne sont pas appliqué

### Exemple
```js
let liste = [
    { nom: "nom 1", age: 1 },
    { nom: "nom 2", age: 5 },
    { nom: "nom 3", age: 10 }
];

liste.where(x => x.age > 1);
liste.where(x => x.nom.includes("2") && x.age > 1);

// les deux where equivaut a un AND logique ou a celui du dessus
liste.where(x => x.nom.includes("2")).where(x.age > 1);
```

## whereOr

Ajouter un filtre `OR` logique
**ATTENTION** Les filtres ne sont pas appliqué

### Exemple
```js
let liste = [
    { nom: "nom 1", age: 1 },
    { nom: "nom 2", age: 5 },
    { nom: "nom 3", age: 10 }
];

liste.whereOr(x => x.age > 1);
liste.whereOr(x => x.age > 1).whereOr(x => x.age <= 5);
```

## all

Verifier que tout les elements de la liste satisfait la condition

### Exemple
```js
let liste = [
    { nom: "nom 1", age: 1 },
    { nom: "nom 2", age: 5 },
    { nom: "nom 3", age: 10 }
];

// true / false
liste.all(x => x.age >= 1);
liste.where(x => x.age > 1).all();
```

## any

Verifier qu'un element de la liste rempli la / les condition(s)

### Exemple
```js
let liste = [
    { nom: "nom 1", age: 1 },
    { nom: "nom 2", age: 5 },
    { nom: "nom 3", age: 10 }
];

// true / false
liste.any(x => x.age > 1);
liste.where(x => x.age > 1).any();
```

## sum

Addictionner les chiffres

### Exemple
```js
let liste = [
    { nom: "nom 1", age: 1 },
    { nom: "nom 2", age: 5 },
    { nom: "nom 3", age: 10 }
];

let listeNombre = [1, 5, 10];

liste.sum(x => x.age);
listeNombre.sum();
```

## min

Recuperer la valeur minimum de la liste

### Exemple
```js
let listeNombre = [1, 5, 10];

listeNombre.min();
```

## minBy

Recuperer l'element avec la valeur minimum de la liste en fonction d'une clé

### Exemple
```js
let liste = [
    { nom: "nom 1", age: 1 },
    { nom: "nom 2", age: 5 },
    { nom: "nom 3", age: 10 }
];

liste.minBy(x => x.age);
```

## max

Recuperer la valeur maximum de la liste

### Exemple
```js
let listeNombre = [1, 5, 10];

listeNombre.max();
```

## maxBy

Recuperer l'element avec la valeur maximum de la liste en fonction d'une clé

### Exemple
```js
let liste = [
    { nom: "nom 1", age: 1 },
    { nom: "nom 2", age: 5 },
    { nom: "nom 3", age: 10 }
];

liste.maxBy(x => x.age);
```

## average

Calculer la moyenne de la liste

### Exemple
```js
let liste = [
    { nom: "nom 1", age: 1 },
    { nom: "nom 2", age: 5 },
    { nom: "nom 3", age: 10 }
];

let listeNombre = [1, 5, 10];

liste.average(x => x.age);
listeNombre.average();
```

## orderBy

Ordonne la liste du plus petit au plus grand ou par ordre alphabetique

### Exemple
```js
let liste = [
    { nom: "nom 1", age: 1 },
    { nom: "nom 2", age: 5 },
    { nom: "nom 3", age: 10 }
];

liste.orderBy(x => x.nom);
liste.orderBy(x => x.age);
```

## orderByDesc

Ordonne la liste du plus grand au plus petit ou par ordre anti-alphabetique

### Exemple
```js
let liste = [
    { nom: "nom 1", age: 1 },
    { nom: "nom 2", age: 5 },
    { nom: "nom 3", age: 10 }
];

liste.orderByDesc(x => x.nom);
liste.orderByDesc(x => x.age);
```

## take

Prendre un nombre X d'element de la liste à partir du debut

### Exemple
```js
let liste = [
    { nom: "nom 1", age: 1 },
    { nom: "nom 2", age: 5 },
    { nom: "nom 3", age: 10 }
];

// prend les deux 1er element de la liste
liste.take(2);
```

## takeLast

Prendre un nombre X d'element de la liste à partir de la fin

### Exemple
```js
let liste = [
    { nom: "nom 1", age: 1 },
    { nom: "nom 2", age: 5 },
    { nom: "nom 3", age: 10 }
];

// prend les deux derniers de la liste
liste.takeLast(2);
```

## skip

Prendre un nombre X d'element de la liste à partir du debut

### Exemple
```js
let liste = [
    { nom: "nom 1", age: 1 },
    { nom: "nom 2", age: 5 },
    { nom: "nom 3", age: 10 }
];

// prend les element de la liste a partir du 2e
liste.skip(2);
```

## skipLast

Prendre un nombre X d'element de la liste à partir de la fin

### Exemple
```js
let liste = [
    { nom: "nom 1", age: 1 },
    { nom: "nom 2", age: 5 },
    { nom: "nom 3", age: 10 }
];

// prend les element de la liste a partir du 2e
liste.skipLast(2);
```

## toArray

Appliquer les filtres et récuperer la liste

### Exemple
```js
let liste = [
    { nom: "nom 1", age: 1 },
    { nom: "nom 2", age: 5 },
    { nom: "nom 3", age: 10 }
];

liste.where(x => x.age > 1).toArray();
```

## toJson

Appliquer les filtres et récuperer la liste sous forme JSON

### Exemple
```js
let liste = [
    { nom: "nom 1", age: 1 },
    { nom: "nom 2", age: 5 },
    { nom: "nom 3", age: 10 }
];

liste.toJson();
```

## select

Appliquer les filtres et récuperer la liste et les valeurs choisis de l'element

### Exemple
```js
let liste = [
    { nom: "nom 1", age: 1 },
    { nom: "nom 2", age: 5 },
    { nom: "nom 3", age: 10 }
];

liste.select(x => ({
    nomModifier: x.nom
}));

// equivalent a toArray()
liste.select(x => x);
```

## selectMany

Appliquer les filtres et récuperer la liste d'un element de la liste source

### Exemple
```js
let liste = [
    { nom: "nom 1", age: 1, listeEnfant: [{ taille: 100, nom: "nom enfant 1" }] },
    { nom: "nom 2", age: 5, listeEnfant: [{ taille: 500, nom: "nom enfant 2" }] },
    { nom: "nom 3", age: 10, listeEnfant: [{ taille: 1000, nom: "nom enfant 3" }] }
];


liste.selectMany(x => x.listeEnfant);
liste.selectMany(x => x.listeEnfant, (parent, element) => ({ taille: element.taille }));
```

## firstOrDefault

Applique les filtres et recuperer le 1er element du resultat

### Exemple
```js
let liste = [
    { nom: "nom 1", age: 1, listeEnfant: [{ taille: 100, nom: "nom enfant 1" }] },
    { nom: "nom 2", age: 5, listeEnfant: [{ taille: 500, nom: "nom enfant 2" }] },
    { nom: "nom 3", age: 10, listeEnfant: [{ taille: 1000, nom: "nom enfant 3" }] }
];

liste.where(x => x.age > 1).firstOrDefault();

// equivalent
liste.firstOrDefault(x => x.age > 1);
```

## lastOrDefault

Applique les filtres et recuperer le dernier element du resultat

### Exemple
```js
let liste = [
    { nom: "nom 1", age: 1, listeEnfant: [{ taille: 100, nom: "nom enfant 1" }] },
    { nom: "nom 2", age: 5, listeEnfant: [{ taille: 500, nom: "nom enfant 2" }] },
    { nom: "nom 3", age: 10, listeEnfant: [{ taille: 1000, nom: "nom enfant 3" }] }
];

liste.where(x => x.age > 1).lastOrDefault();

// equivalent
liste.lastOrDefault(x => x.age > 1);
```

## insert 

Ajouter un element à une position spécifique dans la liste

### Exemple
```js
let liste = [
    { nom: "nom 1", age: 1 },
    { nom: "nom 2", age: 5 },
    { nom: "nom 3", age: 10 }
];

liste.insert(0, { nom: "nom 0", age: 0 });
```

## remove

Supprimer des elements de la liste sous condition(s)

### Exemple
```js
let liste = [
    { nom: "nom 1", age: 1 },
    { nom: "nom 2", age: 5 },
    { nom: "nom 3", age: 10 }
];

// supprimer le / les element(s) qui ne respect pas la condition
liste.where(x => x.age > 1).remove();

// equivalent
liste.remove(x => x.age > 1);
```

## update

Mise à jour des elements de la liste

### Exemple
```js
let liste = [
    { nom: "nom 1", age: 1, obj: { ville: "ville 1" } },
    { nom: "nom 2", age: 5, obj: { ville: "ville 2" } },
    { nom: "nom 3", age: 10, obj: { ville: "ville 3" } }
];

// met a jour le / les element(s) qui respect pas la condition
liste.where(x => x.age > 1).update({
    nom: "coucou", 
    nouvelleCle: "salut",
    obj: { 
        ville: "village" 
    } 
});
```

## updateMany

Mise à jour la liste d'un element de la liste

### Exemple
```js
let liste = [
    { nom: "nom 1", age: 1, obj: [{ ville: "ville 1" }] },
    { nom: "nom 2", age: 5, obj: [{ ville: "ville 2" }] },
    { nom: "nom 3", age: 10, obj: [{ ville: "ville 3" }] }
];

liste.updateMany(x => x.obj, {
    ville: "coucou" 
});

// condition pour appliquer la modification de liste obj
liste.updateMany(
    x => x.obj.where(y => y.ville == "ville 2").toArray(), 
    { ville: "coucou" }
);
```

## range

Creer une liste de nombre

### Exemple
```js
let liste = Array.range(-2, 3);
let liste = Array.range(1, 5);

/**
 * [-2, -1, 0]
 * [1, .., 5]
 * /
```

## repeat

Creer une liste avec X fois la valeur

### Exemple
```js
let liste = Array.repeat({ ville: "ville" }, 10);
let liste = Array.repeat("coucou", 5);
```

## groupBy

Groupe les elements d'une liste

### Exemple
```js
let liste = [
    { ville: "ville 1", age: 1 },
    { ville: "ville 2", age: 5 },
    { ville: "ville 1", age: 10 }
];

let map = liste.groupBy(x => x.ville);
let map = liste.select(x => ({ age: x.age })).groupBy(x => x.age % 2);
```

## elementAtOrDefault

Applique les filtres et recuperer l'element à l'index choisi dans le resultat

### Exemple
```js
let liste = [
    { ville: "ville 1", age: 1 },
    { ville: "ville 2", age: 5 },
    { ville: "ville 1", age: 10 }
];

let retour = liste.elementAtOrDefault(2);
```

## countBy

Applique les filtres, regroupe et compte le nombre d'element par groupe

### Exemple
```js
let liste = [
    { ville: "ville 1", age: 1 },
    { ville: "ville 2", age: 5 },
    { ville: "ville 1", age: 10 }
];

let retour = liste.countBy(x => x.ville);
```

## distinct

Recuperer les elements de la liste sans doublons

### Exemple
```js
let liste = [
    { ville: "ville 1", age: 1 },
    { ville: "ville 2", age: 5 },
    { ville: "ville 1", age: 1 }
];

let retour = liste.distinct();
```

## distinctBy

Recuperer les elements de la liste sans doublons sur une regle spécifique

### Exemple
```js
let liste = [
    { key: "ville 1", value: [13, 12] },
    { key: "ville 2", value: [13, 12] }
];

let retour = liste.distinctBy(x => x.ville);
```

## zip

Zippe l'instance actuelle avec une liste en paires ou via une fonction  
s'arrête au plus court

### Exemple
```js
let listeA = [1, 2, 3, 4, 5, 6];
let listeB = ["A", "B", "C", "D", "E", "F"];

let retour = listeA.zip(listeB);

let retour = listeA.zip(listeB, (p1, p2) => `coucou p1: ${p1} et p2: ${p2}`);
```

## union

Combiner un tableau a l'instance actuelle en supprimant les doublons

### Exemple
```js
let listeA = [
    { ville: "ville 1", age: 1 },
    { ville: "ville 2", age: 5 },
    { ville: "ville 3", age: 10 }
];

let listeB = [
    { ville: "ville 1", age: 1 },
    { ville: "ville 2", age: 5 },
    { ville: "ville 4", age: 10 }
];

let retour = listeA.union(listeB);
```

## unionBy

Combiner un tableau a l'instance actuelle en supprimant les doublons,  
en se basant sur une propriété pour éliminer les doublons

### Exemple
```js
let listeA = [
    { ville: "ville 1", age: 1 },
    { ville: "ville 2", age: 5 },
    { ville: "ville 3", age: 10 }
];

let listeB = [
    { ville: "ville 1", age: 1 },
    { ville: "ville 2", age: 5 },
    { ville: "ville 4", age: 10 }
];

let retour = listeA.unionBy(listeB, x => x.age);
```