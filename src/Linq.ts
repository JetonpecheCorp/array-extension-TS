declare global 
{
    interface Array<T> 
    {
        /**
         * Ajouter un filtre OR logique
         * 
         * @param predicat filtre a appliquer
         * @returns la liste actuelle non modifier
         */
        whereOr(predicat: (value: T, index: number) => unknown): Array<T>,

        /**
         * Ajouter un filtre AND logique
         * 
         * @param predicat filtre a appliquer
         * @returns la liste actuelle non modifier
         */
        where(predicat: (value: T, index: number) => unknown): Array<T>,

        /**
         * Verifier qu'un element de la liste rempli la / les condition(s)
         * 
         * @param predicat filtre a appliquer
         */
        any(predicat?: (value: T) => unknown): boolean,

        /**
         * Verifier que tout les elements de la liste satisfait la condition
         * 
         * @param predicat filtre à appliquer
         */
        all(predicat?: (value: T) => unknown): boolean,

        /**
         * Addictionner les chiffres
         * 
         * @param predicat la propriété à addiction
         */
        sum(predicat?: (value: T) => unknown): number,

        /**
         * Recuperer la valeur minimum de la liste
         */
        min(): T | null,

        /**
         * Recuperer la valeur maximum de la liste
         */
        max(): T | null,

        /**
         * Recuperer l'element avec la valeur minimum de la liste en fonction d'une clé
         * 
         * @param selector la propriété ciblée
         * @returns l'element avec la valeur max ou null si liste vide
         */
        minBy(selector: (value: T) => number | string | Date): T | null,

        /**
         * Recuperer l'element avec la valeur maximum de la liste en fonction d'une clé
         * 
         * @param selector la propriété ciblée
         * @returns l'element avec la valeur max ou null si liste vide
         */
        maxBy(selector: (value: T) => number | string | Date): T | null,

        /**
         * Calcul la moyenne de la liste
         * 
         * @param predicat la propriété ciblée
         */
        average(predicat?: (value: T) => number): number,

        /**
         * Ordonne la liste du plus petit au plus grand ou par ordre alphabetique
         * 
         * @param predicat la propriété ciblée
         */
        orderBy(predicat: (value: T) => number | string | Date): T[],

        /**
         * Ordonne la liste du plus grand au plus petit ou par ordre anti-alphabetique
         * 
         * @param predicat la propriété ciblée
         */
        orderByDesc(predicat: (value: T) => number | string | Date): T[],

        /**
         * Prendre un nombre X d'element de la liste à partir du debut
         * 
         * @param _nb nombre d'element à prendre
         */
        take(_nb: number): T[],

        /**
         * Prendre un nombre X d'element de la liste à partir de la fin
         * 
         * @param _nb nombre d'element à prendre
         */
        takeLast(_nb: number): T[],

        /**
         * Ne pas prendre un nombre X d'element de la liste à partir du debut
         * 
         * @param _nb nombre d'element à passer
         */
        skip(_nb: number): T[],

        /**
         * Ne pas prendre un nombre X d'element de la liste à partir de la fin
         * 
         * @param _nb nombre d'element à passer
         */
        skipLast(_nb: number): T[],

        /**
         * Appliquer les filtres et récuperer la liste sous forme JSON
         */
        toJson(): string,

        /**
         * Appliquer les filtres et récuperer la liste
         * 
         * @param selector Choisir les infos a récuperer
         * 
         * @returns la liste filtrée avec les infos choisient
         */
        select<U>(selector: (value: T, index: number) => U): U[],

        /**
         * Appliquer les filtres et récuperer la liste d'un element de la liste source
         * 
         * @param listSelector Liste à récuperer
         * @param resultSelector Acceder à l'index et aux elements de la liste récupérée
         * 
         * @returns la liste filtrée avec les infos choisient
         */
        selectMany<U, TResult>(
            listSelector: (value: T) => Iterable<U>, 
            resultSelector?: ((sourceValue: T, element: U) => TResult) | null
        ): (TResult | U)[],

        /**
         * Applique les filtres et recuperer le 1er element du resultat
         * 
         * @param predicat filtre à appliquer
         */
        firstOrDefault(predicat?: (value: T, index: number) => unknown): T | null,

        /**
         * Applique les filtres et recuperer le dernier element du resultat
         * 
         * @param predicat filtre à appliquer
         */
        lastOrDefault(predicat?: (value: T, index: number) => unknown): T | null,

        /**
         * Insérer un element à une position spécifique dans l'instance
         * 
         * @param _index position de l'element dans la liste
         * @param _object info à rajouter
         */
        insert(_index: number, _object: T): void,

        /**
         * Supprimer les elements de la liste
         * 
         * @param predicat filtre à appliquer
         */
        remove<U>(predicat?: (value: T) => U): void,

        /**
         * Met à jour les clés de l'object la la liste actuelle 
         * 
         * @param _info infos à modifier
         */
        update(_info: Partial<T>): void,

        /**
         * Met à jour une liste d'un element de l'instance actuelle
         * 
         * @param selector liste à modifier
         * @param _info info à modifier
         */
        updateMany<U>(selector: (value: T) => U[], _info: Partial<U>): void,

        /**
         * Regroupe les elements en fonction de la regle
         * 
         * @param predicat regle à appliquer
         * 
         * @returns une nouvelle instance avec les valeurs groupées
         */
        groupBy<U>(predicat: (value: T) => U): Array<GroupByResult<T>>,

        /**
         * Recupère les elements sans doublons
         * 
         * @returns Une nouvelle instance avec les elements filtrés
         */
        distinct(): T[],

        /**
         * Recupère les elements sans doublons
         * 
         * @param selector regle d'application du distinct
         * 
         * @returns Une nouvelle instance avec les elements filtrés
         */
        distinctBy(selector: (value: T) => unknown): T[],

        /**
         * Pack les elements en sous ensemble
         * 
         * @param _size nombre d'element par sous ensemble
         * 
         * @returns Une nouvelle instance de sous ensemble
         */
        chunk(_size: number): T[][],

        /**
         * Zippe l'instance actuelle avec une liste en paires ou via une fonction  
         * s'arrête au plus court
         * 
         * @param _list liste a zipper avec l'instance actuelle
         * @param selector selecteur de résultat, donne une nouvelle valeur
         */
        zip<U>(_list: U[], selector?: (value: T, value2: U) => unknown): any[] | ZipResult[],

        /**
         * Applique les filtres et donne le nombre d'element dans le resultat
         * 
         * @returns le nombre d'element
         */
        count(): number,

        /**
         * Applique les filtres, regroupe et compte le nombre d'element par groupe
         * 
         * @param selector propriété à se baser pour compter
         */
        countBy<U>(selector: (value: T) => U): Array<CountByResult<T>>,

        /**
         * Applique les filtres et recuperer l'element a l'index choisi dans le resultat
         * 
         * @param _index emplacement de l'element a récuperer
         * @returns l'element ou null
         */
        elementAtOrDefault(_index: number): T | null,

        /**
         * Combiner un tableau avec l'instance actuelle tout en supprimant les doublons
         * 
         * @param _list liste a combiner
         * 
         * @returns Nouvelle instance liste
         */
        union(_list: T[]): T[],

        /**
         * Combiner un tableau avec l'instance actuelle tout en supprimant les doublons
         * 
         * @param _list liste a combiner
         * @param selector propriété à se baser pour éliminer les doublons
         * 
         * @returns Nouvelle instance liste
         */
        unionBy<U>(_list: T[], selector: (value: T) => U): T[],

        /**
         * Recupère les elements sans doublons
         * 
         * @returns Une nouvelle instance avec les elements filtrés
         */
        distinct(): T[],

        /**
         * Recupère les elements sans doublons
         * 
         * @param selector regle d'application du distinct
         * 
         * @returns Une nouvelle instance avec les elements filtrés
         */
        distinctBy<U>(selector: (value: T) => U): T[]
    }

    interface ArrayConstructor {
        /**
         * Creer un tableau de nombre a partir de la valeur de debut
         * 
         * @param _start valeur de debut
         * @param _length longeur de la liste
         */
        range(_start: number, _length: number): number[],

        /**
         * Créer un tableau avec X fois la valeur
         * 
         * @param _value valeur à répéter
         * @param _nb longeur de la liste
         */
        repeat<T>(_value: T, _nb: number): Array<T>
    }
}

//#region type
type GroupByResult<T> =
{
    key: string,
    value: T
}

type CountByResult<T> =
{
    key: string,
    value: T
}

type ZipResult = 
{
    0: any,
    1: any
}
//#endregion

Array.range = function(_start: number, _length: number): number[]
{
    if (_length < 0)
        return [];
    
    return Array.from({ length: _length }, (_, i) => _start + i);
}

Array.repeat = function<T>(_value: T, _nb: number): Array<T>
{
    if (_nb < 0)
        return [];
    
    return Array.from({ length: _nb }, (_) => _value);
}

Array.prototype.where = function<T>(predicat: (value: T, index: number) => unknown): Array<T>
{
    if (!(this as any).filtres) 
        (this as any).filtres = { where: [], whereOr: [] };

    (this as any).filtres.where.push(...[predicat]);

    return this;
}

Array.prototype.whereOr = function<T>(predicat: (value: T, index: number) => unknown): Array<T>
{
    if (!(this as any).filtres) 
        (this as any).filtres = { where: [], whereOr: [] };

    (this as any).filtres.whereOr.push(...[predicat]);

    return this;
}

Array.prototype.any = function<T>(predicat?: (value: T) => unknown): boolean
{
    if(predicat)
    {
        if((this as any).filtres)
            (this as any).filtres.where.push(predicat); 

        else
            return this.some(predicat);
    }

    return this.select(x => x).length > 0;
}

Array.prototype.all = function<T>(predicat?: (value: T) => unknown): boolean
{
    if(predicat)
    {
        if((this as any).filtres)
            (this as any).filtres.where.push(predicat); 

        else
            return this.every(predicat);
    }

    return this.select(x => x).length == this.length;
}

Array.prototype.sum = function<T>(predicat?: (value: T) => unknown): number
{
    let total = 0;
    let filteredList = this.select(x => x);

    if(predicat)
    {
        for (const element of filteredList) 
        {
            let truc: any = predicat(element);

            if(!isNaN(truc))
                total += truc;
        }
    }
    else
    {
        for (const element of this) 
        {
            if(!isNaN(element))
                total += element;    
        }
    }

    return total;
}

Array.prototype.min = function<T extends string | number | Date>(): T | null
{
    let liste = this.select(x => x);

    if(liste.length == 0)
        return null;

    return liste.reduce((elementMin: T, element: T) =>
    {
        return (element < elementMin) ? element : elementMin;
    }, liste[0]);
}

Array.prototype.minBy = function<T>(selector: (value: T) => number | string | Date): T | null
{
    let liste = this.select(x => x);

    if(liste.length == 0)
        return null;

    return liste.reduce((elementMin: T, element: T) =>
    {
        const VALEUR_MIN = selector(elementMin);
        const VALEUR_ACTUELLE = selector(element);

        return (VALEUR_ACTUELLE < VALEUR_MIN) ? element : elementMin;

    }, liste[0]);
}

Array.prototype.max = function<T extends string | number | Date>(): T | null
{
    let liste = this.select(x => x);

    if(liste.length == 0)
        return null;

    return liste.reduce((elementMax: T, element: T) =>
    {
        return (element > elementMax) ? element : elementMax;
    }, liste[0]);
}

Array.prototype.maxBy = function<T>(selector: (value: T) => number | string | Date): T | null
{
    let liste = this.select(x => x);

    if(liste.length == 0)
        return null;

    return liste.reduce((elementMax: T, element: T) =>
    {
        const VALEUR_MAX = selector(elementMax);
        const VALEUR_ACTUELLE = selector(element);

        return (VALEUR_ACTUELLE > VALEUR_MAX) ? element : elementMax;

    }, liste[0]);
}

Array.prototype.average = function<T>(predicat?: (value: T) => number): number
{
    let total = 0;
    let liste = this.select(x => x);

    if(predicat)
    {
        for (const element of liste) 
        {
            let truc = predicat(element);

            if(!isNaN(truc))
                total += truc;
        }
    }
    else
    {
        for (const element of this) 
        {
            if(!isNaN(element))
                total += element;    
        }
    }

    total /= liste.length;

    return total;
}

Array.prototype.orderBy = function<T>(predicat: (value: T) => number | string | Date): T[]
{
    let liste = this.select(x => x);

    return liste.sort((a: T, b: T) =>
    {
        const A = predicat(a);
        const B = predicat(b);

        if(A < B)
            return -1;

        if(A > B)
            return 1;

        return 0;
    });
}

Array.prototype.orderByDesc = function<T>(predicat: (value: T) => number | string | Date): T[]
{
    let liste = this.select(x => x);

    return liste.sort((a: T, b: T) =>
    {
        const A = predicat(a);
        const B = predicat(b);

        if(A < B)
            return 1;

        if(A > B)
            return -1;

        return 0;
    });
}

Array.prototype.take = function<T>(_nb: number): T[]
{
    return this.select(x => x).splice(0, _nb);
}

Array.prototype.takeLast = function<T>(_nb: number): T[]
{
    let liste = this.select(x => x);

    return liste.splice(liste.length - _nb);
}

Array.prototype.skip = function<T>(_nb: number): T[]
{
    let liste = this.select(x => x);

    return liste.splice(_nb);
}

Array.prototype.skipLast = function<T>(_nb: number): T[]
{
    let liste = this.select(x => x);

    return liste.splice(0, liste.length - _nb);
}

Array.prototype.toJson = function(): string
{
    return JSON.stringify(this.select(x => x));
}

Array.prototype.select = function<T, U>(selector: (value: T, index: number) => U): U[]
{
    let listeClone = [...this];

    if(!(this as any).filtres)
        return listeClone.map(selector);

    // Appliquer les filtres where (AND logique)
    if ((this as any).filtres.where.length > 0) 
        listeClone = listeClone.filter(x => (this as any).filtres.where.every((predicate: any) => predicate(x)));

    // Appliquer les filtres whereOr (OR logique entre les conditions)
    if ((this as any).filtres.whereOr.length > 0) 
    {
        const LISTE_FILTRER_OU = this.filter(x => (this as any).filtres.whereOr.some((predicate: any) => predicate(x)));
        // Combiner les résultats du where (AND) et du whereOr (OR)
        // Un élément doit passer le AND ET (au moins un des OR)
        listeClone = listeClone.filter(x => LISTE_FILTRER_OU.includes(x));
    }

    delete (this as any).filtres;

    return listeClone.map(selector);
}

Array.prototype.selectMany = function<T, U, TResult>(
    listSelector: (value: T) => Iterable<U>, 
    resultSelector?: ((sourceValue: T, element: U) => TResult) | null
): (TResult | U)[]
{
    const LISTE_RETOUR = [];
    const SOURCE = this.select(x => x);

    for (const element of SOURCE) 
    {
        const collection = listSelector(element);

        if (collection && typeof collection[Symbol.iterator] === 'function') 
        {
            // donne la liste cible ou donne l'element actuelle et les infos de la liste cible
            for (const element2 of collection) 
                LISTE_RETOUR.push(resultSelector ? resultSelector(element, element2) : element2);
        }
    }

    return LISTE_RETOUR;
}

Array.prototype.firstOrDefault = function<T>(predicat?: (value: T, index: number) => unknown): T | null
{
    return predicat ? this.find(predicat) : this.select(x => x)[0];
}

Array.prototype.lastOrDefault = function<T>(predicat?: (value: T, index: number) => unknown): T | null
{
    let liste = [];

    if(predicat)
        liste = this.filter(predicat);
    else
    {
        liste = this.select(x => x);  

        if(liste.length == 0)
            return null;    
    }

    return liste[liste.length - 1];

}

Array.prototype.insert = function<T>(_index: number, _object: T): void
{
    if(Array.isArray(_object))
        this.splice(_index, 0, ...[_object]);

    else
        this.splice(_index, 0, _object);
}

Array.prototype.remove = function<T, U>(predicat?: (value: T) => U): void
{
    if(this.length == 0)
        return;
    
    if(predicat)
    {
        for (let i = this.length - 1; i >= 0; i--) 
        {
            if (predicat(this[i]))
                this.splice(i, 1);
        }
    }
    else
    {
        const LISTE_A_SUPPRIMER = [...this.select(x => x)];

        // Itérer à l'envers pour éviter les problèmes d'indices
        for (let i = this.length - 1; i >= 0; i--) 
        {
            if (LISTE_A_SUPPRIMER.includes(this[i])) 
                this.splice(i, 1);
        }
    }       
}

Array.prototype.update = function<T>(_info: Partial<T>): void
{
    for (const element of this.select(x => x)) 
    {
        if (typeof element === 'object' && element !== null)
            Object.assign(element, _info);
    }
}

Array.prototype.updateMany = function<T, U>(selector: (value: T) => U[], _info: Partial<U>): void
{
    for (const element of this.select(x => x))
    {
        const LISTE_CIBLE = selector(element);
        
        if (!Array.isArray(LISTE_CIBLE))
            continue;

        for (const target of LISTE_CIBLE) 
        {
            if (typeof target === 'object' && target !== null) 
                Object.assign(target, _info);
        }
    }
}

Array.prototype.groupBy = function<T, U>(predicat: (value: T) => U): Array<GroupByResult<T>>
{
    const map = new Map();

    for (const element of this.select(x => x)) 
    {
        let cle = predicat(element);

        if (!map.has(cle)) 
            map.set(cle, []);

        map.get(cle).push(element);
    }

    // conversion map en array en gardant les clés
    let liste = [];
    for(const element of map)
    {
        liste.push({
            key: element["0"],
            value: element["1"]
        });
    }

    return liste;
}

Array.prototype.chunk = function<T>(_size: number): T[][]
{
    let liste = this.select<T>(x => x);

    if(_size <= 0)
        return [[]];

    let listeRetour = [];

    for (let i = 0; i < liste.length; i += _size) 
    {
        let chunk = this.slice(i, i + _size);
        listeRetour.push(chunk);
    }

    return listeRetour;
}

Array.prototype.zip = function<T, U>(_list: U[], selector?: (value: T, value2: U) => unknown): any[] | ZipResult[]
{
    const LISTE_RETOUR = [];

    let listeInstance = this.select(x => x);
    const LONGEUR_MAX = Math.min(_list.length, listeInstance.length);

    for (let i = 0; i < LONGEUR_MAX; i++) 
        LISTE_RETOUR.push(selector ? selector(listeInstance[i], _list[i]) : { "0": listeInstance[i], "1": _list[i] });   

    return LISTE_RETOUR;
}

Array.prototype.count = function(): number
{
    return this.select(x => x).length;
}

Array.prototype.countBy = function<T, U>(selector: (value: T) => U): Array<CountByResult<T>>
{
    return this
        .groupBy(selector)
        .select(x => ({ key: x.key, value: x.value.length }));
}

Array.prototype.elementAtOrDefault = function<T>(_index: number): T | null
{
    return this.select(x => x)[_index] ?? null;
}

Array.prototype.union = function<T>(_list: T[]): T[]
{
    return this.concat(_list).distinct();
}

Array.prototype.unionBy = function<T, U>(_list: T[], selector: (value: T) => U): T[]
{
    return this.concat(_list).distinctBy(selector);
}

Array.prototype.distinct = function <T>(): T[] 
{
    const seen = new Set<string>();
    const resultat: T[] = [];

    function serializeAndSort(_obj: any): string 
    {
        // Gère les types primitifs et null
        if (_obj === null || typeof _obj !== 'object')
            return JSON.stringify(_obj);

        // Sérialise et trie les tableaux
        if (Array.isArray(_obj)) 
        {
            const serializedElements = _obj.map(serializeAndSort).sort();
            return `[${serializedElements.join(',')}]`;
        }

        // Sérialise et trie les propriétés des objets
        const sortedKeys = Object.keys(_obj).sort();

        const serializedProps = sortedKeys.map(key => 
        {
            const value = serializeAndSort(_obj[key]);
            return `"${key}":${value}`;
        });

        return `{${serializedProps.join(',')}}`;
    }

    for (const element of this.select(x => x)) 
    {
        const serialized = serializeAndSort(element);

        if (!seen.has(serialized)) 
        {
            seen.add(serialized);
            resultat.push(element);
        }
    }

  return resultat;
}

Array.prototype.distinctBy = function <T, U>(selector: (value: T) => U): T[] 
{
    const seen = new Set<any>();
    const resultat: T[] = [];

    function serializeAndSort(_obj: any): any 
    {
        // Gère les types primitifs et null
        if (_obj === null || typeof _obj !== 'object')
            return _obj;

        // Sérialise et trie les tableaux
        if (Array.isArray(_obj))
            return JSON.stringify(_obj.map(serializeAndSort).sort());

        // Sérialise et trie les propriétés des objets
        const sortedKeys = Object.keys(_obj).sort();
        const serialized: any = {};
        
        for (const key of sortedKeys)
            serialized[key] = serializeAndSort(_obj[key]);

        return JSON.stringify(serialized);
    }

    for (const element of this.select(x => x)) 
    {
        const key = selector(element);
        let serializedKey: any;

        // Pour les valeurs primitives, pas besoin de sérialisation
        if (key === null || typeof key !== 'object')
            serializedKey = key;

        // Pour les objets et tableaux, on les sérialise pour une comparaison stable
        else
            serializedKey = serializeAndSort(key);

        if (!seen.has(serializedKey)) 
        {
            seen.add(serializedKey);
            resultat.push(element);
        }
    }

  return resultat;
}

export {}
