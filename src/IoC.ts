import 'reflect-metadata';

import getDecorators from 'inversify-inject-decorators';
import { Container } from 'inversify';
import { AirportsStore } from './stores/AirportsStore';
import { FlightsStore } from './stores/FlightsStore';

const container = new Container();

const singletons = [
  AirportsStore,
  FlightsStore,
];

for (const singleton of singletons) {
  container.bind<any>(singleton).to(singleton).inSingletonScope();
}

const { lazyInject } = getDecorators(container);

export {
  container,
  lazyInject,
};
