declare global
{
    interface Array<T>
    {
        /**
         * Appends a logical OR filter to the pipeline.
         * Filter is evaluated lazily when a terminal method is called.
         * 
         * @param predicat Predicate function to evaluate.
         * @returns The current array instance for chaining.
         */
        whereOr(predicat: (value: T, index: number) => unknown): Array<T>;

        /**
         * Appends a logical AND filter to the pipeline.
         * Filter is evaluated lazily when a terminal method is called.
         * 
         * @param predicat Predicate function to evaluate.
         * @returns The current array instance for chaining.
         */
        where(predicat: (value: T, index: number) => unknown): Array<T>;

        /**
         * Determines whether any element matches the provided condition, 
         * or whether the collection contains any element.
         * 
         * @param predicat Optional predicate function.
         */
        any(predicat?: (value: T) => unknown): boolean;

        /**
         * Determines whether all elements satisfy the provided condition.
         * 
         * @param predicat Optional predicate function.
         */
        all(predicat?: (value: T) => unknown): boolean;

        /**
         * Computes the sum of numeric values or property projections.
         * 
         * @param predicat Optional selector returning a numeric value.
         */
        sum(predicat?: (value: T) => unknown): number;

        /**
         * Returns the minimum value in the sequence, or null if empty.
         */
        min(): T | null;

        /**
         * Returns the maximum value in the sequence, or null if empty.
         */
        max(): T | null;

        /**
         * Invokes a transform function on each element and returns the element with the minimum value.
         * 
         * @param selecteur Value selector.
         * @returns The item having the minimum value, or null if empty.
         */
        minBy(selecteur: (value: T) => number | string | Date): T | null;

        /**
         * Invokes a transform function on each element and returns the element with the maximum value.
         * 
         * @param selecteur Value selector.
         * @returns The item having the maximum value, or null if empty.
         */
        maxBy(selecteur: (value: T) => number | string | Date): T | null;

        /**
         * Computes the average of sequence values.
         * 
         * @param predicat Optional selector returning a numeric value.
         */
        average(predicat?: (value: T) => number): number;

        /**
         * Sorts the elements in ascending order according to a key.
         * 
         * @param predicat Key selector.
         */
        orderBy(predicat: (value: T) => number | string | Date): T[];

        /**
         * Sorts the elements in descending order according to a key.
         * 
         * @param predicat Key selector.
         */
        orderByDesc(predicat: (value: T) => number | string | Date): T[];

        /**
         * Returns a specified number of contiguous elements from the start of a sequence.
         * 
         * @param nbElement Number of elements to take.
         */
        take(nbElement: number): T[];

        /**
         * Returns a specified number of contiguous elements from the end of a sequence.
         * 
         * @param nbElement Number of elements to take.
         */
        takeLast(nbElement: number): T[];

        /**
         * Bypasses a specified number of elements and returns the remaining elements.
         * 
         * @param nbElement Number of elements to bypass.
         */
        skip(nbElement: number): T[];

        /**
         * Bypasses a specified number of elements from the end and returns the remaining elements.
         * 
         * @param nbElement Number of elements to bypass from the end.
         */
        skipLast(nbElement: number): T[];

        /**
         * Evaluates filters and serializes the resulting sequence to a JSON string.
         */
        toJson(): string;

        /**
         * Projects each element of a sequence into a new form after applying active filters.
         * 
         * @param selecteur Transform function.
         */
        select<U>(selecteur: (value: T, index: number) => U): U[];

        /**
         * Projects each element of a sequence to an Iterable and flattens the resulting sequences into one sequence.
         * 
         * @param selecteurCollection Transform function producing an iterable collection.
         * @param selecteurResultat Optional transform function applied to both source and inner elements.
         */
        selectMany<U, TResultat = U>(
            selecteurCollection: (value: T) => Iterable<U>,
            selecteurResultat?: ((sourceElement: T, childElement: U) => TResultat) | null
        ): TResultat[];

        /**
         * Returns the first element of a sequence, or null if no element is found.
         * 
         * @param predicat Optional filter predicate.
         */
        firstOrDefault(predicat?: (value: T, index: number) => unknown): T | null;

        /**
         * Returns the last element of a sequence, or null if no element is found.
         * 
         * @param predicat Optional filter predicate.
         */
        lastOrDefault(predicat?: (value: T, index: number) => unknown): T | null;

        /**
         * Inserts an element or array of elements at the specified index in the current instance.
         * 
         * @param index The zero-based index where item should be inserted.
         * @param element The element to insert.
         */
        insert(index: number, element: T | T[]): void;

        /**
         * Removes elements matching the specified predicate, or elements passing active filters.
         * 
         * @param predicat Optional removal predicate.
         */
        remove<U>(predicat?: (value: T) => U): void;

        /**
         * Mutates objects in the filtered sequence by assigning the specified properties.
         * 
         * @param update Properties to assign.
         */
        update(update: Partial<T>): void;

        /**
         * Mutates target child collections of matching elements.
         * 
         * @param selecteur Selector returning the child collection to update.
         * @param update Properties to assign to child items.
         */
        updateMany<U>(selecteur: (value: T) => U[], update: Partial<U>): void;

        /**
         * Groups the elements of a sequence according to a specified key selector.
         * 
         * @param predicat Function to extract the group key.
         */
        groupBy<U>(predicat: (value: T) => U): Array<GroupByResult<T>>;

        /**
         * Returns distinct elements from a sequence based on deep serialization comparison.
         */
        distinct(): T[];

        /**
         * Returns distinct elements from a sequence according to a specified key selector.
         * 
         * @param selecteur Function to extract comparison key.
         */
        distinctBy<U>(selecteur: (value: T) => U): T[];

        /**
         * Splits the elements of a sequence into chunks of given size.
         * 
         * @param taille Maximum size of each chunk.
         */
        chunk(taille: number): T[][];

        /**
         * Merges two sequences into one sequence by combining elements with matching indices.
         * 
         * @param targetList Target sequence to pair with.
         * @param selecteur Optional projection function for combined elements.
         */
        zip<U, R = ZipResult<T, U>>(targetList: U[], selecteur?: (value1: T, value2: U) => R): R[];

        /**
         * Returns the number of elements matching current filters.
         */
        count(): number;

        /**
         * Groups elements and returns the count of items in each group.
         * 
         * @param selecteur Function to extract the group key.
         */
        countBy<U>(selecteur: (value: T) => U): Array<CountByResult<U>>;

        /**
         * Returns the element at a specified index in a sequence or null if the index is out of range.
         * 
         * @param index The zero-based index of the element to retrieve.
         */
        elementAtOrDefault(index: number): T | null;

        /**
         * Produces the set union of two sequences using deep equality comparison.
         * 
         * @param liste The sequence whose distinct elements form the second set for the union.
         */
        union(liste: T[]): T[];

        /**
         * Produces the set union of two sequences according to a specified key selector.
         * 
         * @param liste The sequence whose distinct elements form the second set for the union.
         * @param selecteur Key selector.
         */
        unionBy<U>(liste: T[], selecteur: (value: T) => U): T[];
    }

    interface ArrayConstructor
    {
        /**
         * Generates a sequence of integral numbers within a specified range.
         * 
         * @param debut Value of the first integer in the sequence.
         * @param longueur Number of sequential integers to generate.
         */
        range(debut: number, longueur: number): number[];

        /**
         * Generates a sequence that contains one repeated value.
         * 
         * @param value The value to repeat.
         * @param quantite Number of times to repeat the value.
         */
        repeat<T>(value: T, quantite: number): Array<T>;
    }
}

type GroupByResult<T> = {
    key: string;
    value: T[];
};

type CountByResult<T> = {
    key: T;
    value: number;
};

type ZipResult<T = any, U = any> = {
    0: T;
    1: U;
};

interface EtatFiltres<T>
{
    where: Array<(value: T, index: number) => unknown>;
    whereOr: Array<(value: T, index: number) => unknown>;
}

// Fonction utilitaire pour appliquer et réinitialiser les filtres en attente
function obtenirListeFiltree<T>(tableau: any): T[]
{
    const filtresActifs: EtatFiltres<T> | undefined = tableau.filtres;
    delete tableau.filtres;

    if (!filtresActifs)
    {
        return tableau.slice();
    }

    const { where: filtresAnd, whereOr: filtresOr } = filtresActifs;
    const aFiltresAnd = filtresAnd.length > 0;
    const aFiltresOr = filtresOr.length > 0;

    if (!aFiltresAnd && !aFiltresOr)
    {
        return tableau.slice();
    }

    const resultat: T[] = [];
    for (let i = 0; i < tableau.length; i++)
    {
        const element = tableau[i];

        if (aFiltresAnd && !filtresAnd.every(predicat => Boolean(predicat(element, i))))
        {
            continue;
        }

        if (aFiltresOr && !filtresOr.some(predicat => Boolean(predicat(element, i))))
        {
            continue;
        }

        resultat.push(element);
    }

    return resultat;
}

Array.range = function (debut: number, longueur: number): number[]
{
    if (longueur <= 0) return [];
    return Array.from({ length: longueur }, (_, index) => debut + index);
};

Array.repeat = function <T>(value: T, quantite: number): Array<T>
{
    if (quantite <= 0) return [];
    return Array.from({ length: quantite }, () => value);
};

Array.prototype.where = function <T>(predicat: (value: T, index: number) => unknown): Array<T>
{
    const instance = this as any;
    if (!instance.filtres) instance.filtres = { where: [], whereOr: [] };
    instance.filtres.where.push(predicat);
    return this;
};

Array.prototype.whereOr = function <T>(predicat: (value: T, index: number) => unknown): Array<T>
{
    const instance = this as any;
    if (!instance.filtres) instance.filtres = { where: [], whereOr: [] };
    instance.filtres.whereOr.push(predicat);
    return this;
};

Array.prototype.any = function <T>(predicat?: (value: T) => unknown): boolean
{
    const instance = this as any;
    if (predicat)
    {
        if (instance.filtres)
        {
            instance.filtres.where.push(predicat);
        } else
        {
            return this.some(predicat);
        }
    }
    return obtenirListeFiltree<T>(this).length > 0;
};

Array.prototype.all = function <T>(predicat?: (value: T) => unknown): boolean
{
    const instance = this as any;
    if (predicat)
    {
        if (instance.filtres)
        {
            instance.filtres.where.push(predicat);
        } else
        {
            return this.every(predicat);
        }
    }
    return obtenirListeFiltree<T>(this).length === this.length;
};

Array.prototype.sum = function <T>(predicat?: (value: T) => unknown): number
{
    const elements = obtenirListeFiltree<T>(this);
    let total = 0;

    for (let i = 0; i < elements.length; i++)
    {
        const valueBrute: any = predicat ? predicat(elements[i]) : elements[i];
        const valueNumerique = Number(valueBrute);
        if (!isNaN(valueNumerique))
        {
            total += valueNumerique;
        }
    }

    return total;
};

Array.prototype.min = function <T extends string | number | Date>(): T | null
{
    const elements = obtenirListeFiltree<T>(this);
    if (elements.length === 0) return null;

    let valueMinimale: T = elements[0];
    for (let i = 1; i < elements.length; i++)
    {
        if (elements[i] < valueMinimale)
        {
            valueMinimale = elements[i];
        }
    }
    return valueMinimale;
};

Array.prototype.minBy = function <T>(selecteur: (value: T) => number | string | Date): T | null
{
    const elements = obtenirListeFiltree<T>(this);
    if (elements.length === 0) return null;

    let elementMinimal = elements[0];
    let valueMinimale = selecteur(elementMinimal);

    for (let i = 1; i < elements.length; i++)
    {
        const valueActuelle = selecteur(elements[i]);
        if (valueActuelle < valueMinimale)
        {
            valueMinimale = valueActuelle;
            elementMinimal = elements[i];
        }
    }
    return elementMinimal;
};

Array.prototype.max = function <T extends string | number | Date>(): T | null
{
    const elements = obtenirListeFiltree<T>(this);
    if (elements.length === 0) return null;

    let valueMaximale: T = elements[0];
    for (let i = 1; i < elements.length; i++)
    {
        if (elements[i] > valueMaximale)
        {
            valueMaximale = elements[i];
        }
    }
    return valueMaximale;
};

Array.prototype.maxBy = function <T>(selecteur: (value: T) => number | string | Date): T | null
{
    const elements = obtenirListeFiltree<T>(this);
    if (elements.length === 0) return null;

    let elementMaximal = elements[0];
    let valueMaximale = selecteur(elementMaximal);

    for (let i = 1; i < elements.length; i++)
    {
        const valueActuelle = selecteur(elements[i]);
        if (valueActuelle > valueMaximale)
        {
            valueMaximale = valueActuelle;
            elementMaximal = elements[i];
        }
    }
    return elementMaximal;
};

Array.prototype.average = function <T>(predicat?: (value: T) => number): number
{
    const elements = obtenirListeFiltree<T>(this);
    if (elements.length === 0) return 0;

    let total = 0;
    for (let i = 0; i < elements.length; i++)
    {
        const valueBrute: any = predicat ? predicat(elements[i]) : elements[i];
        const valueNumerique = Number(valueBrute);
        if (!isNaN(valueNumerique))
        {
            total += valueNumerique;
        }
    }
    return total / elements.length;
};

Array.prototype.orderBy = function <T>(predicat: (value: T) => number | string | Date): T[]
{
    return obtenirListeFiltree<T>(this).sort((elementA: T, elementB: T) =>
    {
        const cleA = predicat(elementA);
        const cleB = predicat(elementB);
        return cleA < cleB ? -1 : cleA > cleB ? 1 : 0;
    });
};

Array.prototype.orderByDesc = function <T>(predicat: (value: T) => number | string | Date): T[]
{
    return obtenirListeFiltree<T>(this).sort((elementA: T, elementB: T) =>
    {
        const cleA = predicat(elementA);
        const cleB = predicat(elementB);
        return cleA < cleB ? 1 : cleA > cleB ? -1 : 0;
    });
};

Array.prototype.take = function <T>(nbElement: number): T[]
{
    if (nbElement <= 0) return [];
    return obtenirListeFiltree<T>(this).slice(0, nbElement);
};

Array.prototype.takeLast = function <T>(nbElement: number): T[]
{
    if (nbElement <= 0) return [];
    const elements = obtenirListeFiltree<T>(this);
    return elements.slice(Math.max(0, elements.length - nbElement));
};

Array.prototype.skip = function <T>(nbElement: number): T[]
{
    if (nbElement <= 0) return obtenirListeFiltree<T>(this);
    return obtenirListeFiltree<T>(this).slice(nbElement);
};

Array.prototype.skipLast = function <T>(nbElement: number): T[]
{
    if (nbElement <= 0) return obtenirListeFiltree<T>(this);
    const elements = obtenirListeFiltree<T>(this);
    return elements.slice(0, Math.max(0, elements.length - nbElement));
};

Array.prototype.toJson = function (): string
{
    return JSON.stringify(obtenirListeFiltree(this));
};

Array.prototype.select = function <T, U>(selecteur: (value: T, index: number) => U): U[]
{
    const elements = obtenirListeFiltree<T>(this);
    return elements.map(selecteur);
};

Array.prototype.selectMany = function <T, U, TResultat = U>(
    selecteurCollection: (value: T) => Iterable<U>,
    selecteurResultat?: ((sourceElement: T, childElement: U) => TResultat) | null
): TResultat[]
{
    const listeFinale: TResultat[] = [];
    const source = obtenirListeFiltree<T>(this);

    for (let i = 0; i < source.length; i++)
    {
        const elementParent = source[i];
        const collection = selecteurCollection(elementParent);

        if (collection && typeof collection[Symbol.iterator] === "function")
        {
            for (const childElement of collection)
            {
                listeFinale.push(
                    selecteurResultat
                        ? selecteurResultat(elementParent, childElement)
                        : (childElement as unknown as TResultat)
                );
            }
        }
    }

    return listeFinale;
};

Array.prototype.firstOrDefault = function <T>(predicat?: (value: T, index: number) => unknown): T | null
{
    const elements = obtenirListeFiltree<T>(this);
    if (!predicat)
    {
        return elements.length > 0 ? elements[0] : null;
    }
    return elements.find(predicat) ?? null;
};

Array.prototype.lastOrDefault = function <T>(predicat?: (value: T, index: number) => unknown): T | null
{
    const elements = obtenirListeFiltree<T>(this);
    if (predicat)
    {
        for (let i = elements.length - 1; i >= 0; i--)
        {
            if (predicat(elements[i], i))
            {
                return elements[i];
            }
        }
        return null;
    }
    return elements.length > 0 ? elements[elements.length - 1] : null;
};

Array.prototype.insert = function <T>(index: number, element: T | T[]): void
{
    if (Array.isArray(element))
    {
        this.splice(index, 0, ...element);
    } else
    {
        this.splice(index, 0, element);
    }
};

Array.prototype.remove = function <T, U>(predicat?: (value: T) => U): void
{
    if (this.length === 0) return;

    if (predicat)
    {
        for (let i = this.length - 1; i >= 0; i--)
        {
            if (predicat(this[i]))
            {
                this.splice(i, 1);
            }
        }
    } else
    {
        const elementsASupprimer = new Set(obtenirListeFiltree<T>(this));
        for (let i = this.length - 1; i >= 0; i--)
        {
            if (elementsASupprimer.has(this[i]))
            {
                this.splice(i, 1);
            }
        }
    }
};

Array.prototype.update = function <T>(update: Partial<T>): void
{
    const elements = obtenirListeFiltree<T>(this);
    for (let i = 0; i < elements.length; i++)
    {
        const item = elements[i];
        if (item !== null && typeof item === "object")
        {
            Object.assign(item, update);
        }
    }
};

Array.prototype.updateMany = function <T, U>(selecteur: (value: T) => U[], update: Partial<U>): void
{
    const elements = obtenirListeFiltree<T>(this);
    for (let i = 0; i < elements.length; i++)
    {
        const collectionCible = selecteur(elements[i]);
        if (!Array.isArray(collectionCible)) continue;

        for (let j = 0; j < collectionCible.length; j++)
        {
            const elementCible = collectionCible[j];
            if (elementCible !== null && typeof elementCible === "object")
            {
                Object.assign(elementCible, update);
            }
        }
    }
};

Array.prototype.groupBy = function <T, U>(predicat: (value: T) => U): Array<GroupByResult<T>>
{
    const tableGroupes = new Map<string, T[]>();
    const elements = obtenirListeFiltree<T>(this);

    for (let i = 0; i < elements.length; i++)
    {
        const item = elements[i];
        const cle = String(predicat(item));
        const groupeExistant = tableGroupes.get(cle);

        if (groupeExistant)
        {
            groupeExistant.push(item);
        } else
        {
            tableGroupes.set(cle, [item]);
        }
    }

    const resultat: Array<GroupByResult<T>> = [];
    for (const [key, value] of tableGroupes)
    {
        resultat.push({ key, value });
    }

    return resultat;
};

Array.prototype.chunk = function <T>(taille: number): T[][]
{
    if (taille <= 0) return [[]];

    const elements = obtenirListeFiltree<T>(this);
    const listeGroupes: T[][] = [];

    for (let i = 0; i < elements.length; i += taille)
    {
        listeGroupes.push(elements.slice(i, i + taille));
    }

    return listeGroupes;
};

Array.prototype.zip = function <T, U, R = ZipResult<T, U>>(targetList: U[], selecteur?: (value1: T, value2: U) => R): R[]
{
    const resultat: R[] = [];
    const elementsSource = obtenirListeFiltree<T>(this);
    const longueurMinimale = Math.min(targetList.length, elementsSource.length);

    for (let i = 0; i < longueurMinimale; i++)
    {
        resultat.push(
            selecteur
                ? selecteur(elementsSource[i], targetList[i])
                : ({ 0: elementsSource[i], 1: targetList[i] } as unknown as R)
        );
    }

    return resultat;
};

Array.prototype.count = function (): number
{
    return obtenirListeFiltree(this).length;
};

Array.prototype.countBy = function <T, U>(selecteur: (value: T) => U): Array<CountByResult<U>>
{
    const tableOccurrences = new Map<U, number>();
    const elements = obtenirListeFiltree<T>(this);

    for (let i = 0; i < elements.length; i++)
    {
        const cle = selecteur(elements[i]);
        tableOccurrences.set(cle, (tableOccurrences.get(cle) ?? 0) + 1);
    }

    const resultat: Array<CountByResult<U>> = [];
    for (const [key, value] of tableOccurrences)
    {
        resultat.push({ key, value });
    }

    return resultat;
};

Array.prototype.elementAtOrDefault = function <T>(index: number): T | null
{
    const elements = obtenirListeFiltree<T>(this);
    return elements[index] ?? null;
};

Array.prototype.union = function <T>(liste: T[]): T[]
{
    return obtenirListeFiltree<T>(this).concat(liste).distinct();
};

Array.prototype.unionBy = function <T, U>(liste: T[], selecteur: (value: T) => U): T[]
{
    return obtenirListeFiltree<T>(this).concat(liste).distinctBy(selecteur);
};

// Sérialisation stable pour dédoublonner objets et tableaux
function serialiserCle(objet: any): string
{
    if (objet === null || typeof objet !== "object")
    {
        return JSON.stringify(objet);
    }

    if (Array.isArray(objet))
    {
        return `[${objet.map(serialiserCle).sort().join(",")}]`;
    }

    const clesTriees = Object.keys(objet).sort();
    const proprietes = clesTriees.map(cle => `"${cle}":${serialiserCle(objet[cle])}`);
    return `{${proprietes.join(",")}}`;
}

Array.prototype.distinct = function <T>(): T[]
{
    const clesUniques = new Set<string>();
    const resultat: T[] = [];
    const elements = obtenirListeFiltree<T>(this);

    for (let i = 0; i < elements.length; i++)
    {
        const element = elements[i];
        const cle = serialiserCle(element);
        if (!clesUniques.has(cle))
        {
            clesUniques.add(cle);
            resultat.push(element);
        }
    }

    return resultat;
};

Array.prototype.distinctBy = function <T, U>(selecteur: (value: T) => U): T[]
{
    const clesUniques = new Set<any>();
    const resultat: T[] = [];
    const elements = obtenirListeFiltree<T>(this);

    for (let i = 0; i < elements.length; i++)
    {
        const element = elements[i];
        const valueCle = selecteur(element);
        const cleFinale = (valueCle === null || typeof valueCle !== "object") ? valueCle : serialiserCle(valueCle);

        if (!clesUniques.has(cleFinale))
        {
            clesUniques.add(cleFinale);
            resultat.push(element);
        }
    }

    return resultat;
};

export { };