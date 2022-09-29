
+++
title = "ELK"
slug = "elk"
date = "2019-01-04T11:50:08Z"
draft = false
type = "lab"
author = "osgav"
tags = ["ELK"]
+++

**`created: 04/01/2019`**<br />
**`updated: 09/03/2019`**

---

### ESO Master Merchant data in ELK

- https://github.com/osgav/mmdata



### elk-docker

```
docker pull sebp/elk
docker run -p 5601:5601 -p 9200:9200 -p 5044:5044 -it --name elk sebp/elk
```

- https://elk-docker.readthedocs.io/
- https://hub.docker.com/r/sebp/elk/
- https://github.com/spujadas/elk-docker



### Kibana misc.


- filter for wildcarding against fields

```
{
  "query": {
    "query_string": {
      "analyze_wildcard": true,
      "fields": [
        "message"
      ],
      "lowercase_expanded_terms": false,
      "query": "*INFO*"
    }
  }
}
```

- demonstration of how awesome Kibana can be...

{{< tweet 1096813406785597440 >}}
<!-- https://twitter.com/trondhindenes/status/1096813406785597440 -->