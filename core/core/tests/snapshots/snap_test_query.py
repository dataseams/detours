# -*- coding: utf-8 -*-
# snapshottest: v1 - https://goo.gl/zC4yUc
from __future__ import unicode_literals

from snapshottest import Snapshot


snapshots = Snapshot()

snapshots['TestCaseAPI::test_hero_name_query 1'] = {
    'data': {
        'hero': {
            'name': 'R2-D2'
        }
    }
}

snapshots['TestCaseAPI::test_hero_name_and_friends_query 1'] = {
    'data': {
        'hero': {
            'friends': [
                {
                    'name': 'Luke Skywalker'
                },
                {
                    'name': 'Han Solo'
                },
                {
                    'name': 'Leia Organa'
                }
            ],
            'id': '2001',
            'name': 'R2-D2'
        }
    }
}

snapshots['TestCaseAPI::test_nested_query 1'] = {
    'data': {
        'hero': {
            'friends': [
                {
                    'appearsIn': [
                        'NEWHOPE',
                        'EMPIRE',
                        'JEDI'
                    ],
                    'friends': [
                        {
                            'id': '1002',
                            'name': 'Han Solo'
                        },
                        {
                            'id': '1003',
                            'name': 'Leia Organa'
                        },
                        {
                            'id': '2000',
                            'name': 'C-3PO'
                        },
                        {
                            'id': '2001',
                            'name': 'R2-D2'
                        }
                    ],
                    'id': '1000',
                    'name': 'Luke Skywalker'
                },
                {
                    'appearsIn': [
                        'NEWHOPE',
                        'EMPIRE',
                        'JEDI'
                    ],
                    'friends': [
                        {
                            'id': '1000',
                            'name': 'Luke Skywalker'
                        },
                        {
                            'id': '1003',
                            'name': 'Leia Organa'
                        },
                        {
                            'id': '2001',
                            'name': 'R2-D2'
                        }
                    ],
                    'id': '1002',
                    'name': 'Han Solo'
                },
                {
                    'appearsIn': [
                        'NEWHOPE',
                        'EMPIRE',
                        'JEDI'
                    ],
                    'friends': [
                        {
                            'id': '1000',
                            'name': 'Luke Skywalker'
                        },
                        {
                            'id': '1002',
                            'name': 'Han Solo'
                        },
                        {
                            'id': '2000',
                            'name': 'C-3PO'
                        },
                        {
                            'id': '2001',
                            'name': 'R2-D2'
                        }
                    ],
                    'id': '1003',
                    'name': 'Leia Organa'
                }
            ],
            'id': '2001',
            'name': 'R2-D2'
        }
    }
}

snapshots['TestCaseAPI::test_fetch_luke_query 1'] = {
    'data': {
        'human': {
            'name': 'Luke Skywalker'
        }
    }
}

snapshots['TestCaseAPI::test_fetch_some_id_query 1'] = {
    'data': {
        'human': {
            'name': 'Luke Skywalker'
        }
    }
}

snapshots['TestCaseAPI::test_fetch_luke_aliased 1'] = {
    'data': {
        'luke': {
            'name': 'Luke Skywalker'
        }
    }
}

snapshots['TestCaseAPI::test_fetch_luke_and_leia_aliased 1'] = {
    'data': {
        'leia': {
            'name': 'Leia Organa'
        },
        'luke': {
            'name': 'Luke Skywalker'
        }
    }
}

snapshots['TestCaseAPI::test_duplicate_fields 1'] = {
    'data': {
        'leia': {
            'homePlanet': 'Alderaan',
            'name': 'Leia Organa'
        },
        'luke': {
            'homePlanet': 'Tatooine',
            'name': 'Luke Skywalker'
        }
    }
}

snapshots['TestCaseAPI::test_use_fragment 1'] = {
    'data': {
        'leia': {
            'homePlanet': 'Alderaan',
            'name': 'Leia Organa'
        },
        'luke': {
            'homePlanet': 'Tatooine',
            'name': 'Luke Skywalker'
        }
    }
}

snapshots['TestCaseAPI::test_check_type_of_r2 1'] = {
    'data': {
        'hero': {
            '__typename': 'Droid',
            'name': 'R2-D2'
        }
    }
}

snapshots['TestCaseAPI::test_check_type_of_luke_in_episode 1'] = {
    'errors': [
        {
            'locations': [
                {
                    'column': 17,
                    'line': 3
                }
            ],
            'message': 'Cannot query field "hery" on type "Query". Did you mean "hero"?'
        }
    ]
}
