import { TodosFilter} from './todos-filter.pipe';

describe('TodosPipe', () => {
  it('create an instance', () => {
    const pipe = new TodosFilter();
    expect(pipe).toBeTruthy();
  });
});
