class Helpers {

  getBaseHref(): string {

    let baseHref;
    const bases = document.getElementsByTagName('base');

    if (bases.length > 0) {
      baseHref = bases[0].getAttribute('href');
    }

    return baseHref ? baseHref : '/';
  }
}

export const helpers = new Helpers();
