+++
author = "osgav"
date = "2019-02-23T11:00:01Z"
draft = false
image = "images/posts/mermaid-diagrams/mermaidheader.png"
share = true
slug = "mermaid-diagrams"
tags = ["mermaid", "diagrams", "Grafana", "Hugo"]
title = "Mermaid Diagrams"
[menu.main]
parent = "blog"

+++

{{< mermaid/source >}}

{{< mermaid/diagram >}}

graph LR;

A(Mermaid)
B(Diagrams)
C(Are)
D(Awesome)

A-->B;
B-->C;
C-->D;

style B fill:#f9f,stroke:#333,stroke-width:4px
click B "https://mermaidjs.github.io" "Mermaid!"

{{< / mermaid/diagram >}}

<!--more-->

### Grafana

I have Grafana to thank for introducing me to Mermaid diagrams - one day at work a new *Diagram* widget appeared and naturally I had to explore further.

[What I found amazed me](https://grafana.com/plugins/jdbranham-diagram-panel). If you are a fan of diagramming, markdown, and CLI tools - and have not heard of [Mermaid](https://mermaidjs.github.io/), you are in for a treat!

*:heart:*

### Flowcharts

Mostly I find myself making use of the basic flowchart abilities. You can quickly conjure up `something` like this in a couple of minutes:

{{< mermaid/diagram >}}

graph LR;

A(something 1)
B(something 2)
C(something 3)
D(something 4)
E(something 5)
F(something 6)
G(something 7)
H(something 9)
I(something 10)

A-->B
A-->C
A-->D
B-->E
C-->E
C-->F
C-->G
D-->G
F-->H
F-->I


{{< / mermaid/diagram >}}

<br />

By writing the following:

```
graph LR;

A(something 1)
B(something 2)
C(something 3)
D(something 4)
E(something 5)
F(something 6)
G(something 7)
H(something 9)
I(something 10)

A-->B
A-->C
A-->D
B-->E
C-->E
C-->F
C-->G
D-->G
F-->H
F-->I
```

Of course you can use slightly more meaningful names, rather than A, B, C etc. You can also define the names as you go, though I've started to prefer listing them all out first - it makes future adjustments easier.


{{< mermaid/diagram >}}

graph LR;

LB(Loadbalancer)-->AppLogin(Login Service)
LB-->AppWeb(Web Service)
LB-->AppData(Data Service)
AppLogin-->DBUser(User Database)
AppWeb-->DBUser
AppData-->DBUser

{{< / mermaid/diagram >}}

```
graph LR;

LB(Loadbalancer)-->AppLogin(Login Service)
LB-->AppWeb(Web Service)
LB-->AppData(Data Service)
AppLogin-->DBUser(User Database)
AppWeb-->DBUser
AppData-->DBUser
```

You don't actually need to provide (Different Names) like that either, if you don't care about spaces, so this could be cleaner:

```
graph LR;

Loadbalancer --> LoginService
Loadbalancer --> WebService
Loadbalancer --> DataService

LoginService --> UserDatabase
WebService --> UserDatabase
DataService --> UserDatabase
```

Flowcharts can also include **subgraphs** which become very helpful when making larger diagrams. For example, see how the `something` flowchart above changes when subgraphs are introduced:



{{< mermaid/diagram >}}
graph LR;

A(something 1)
B(something 2)
D(something 4)
E(something 5)
G(something 7)

subgraph tada;
  C(something 3)
  F(something 6)
  H(something 9)
  I(something 10)
end

A-->B
A-->C
A-->D
B-->E
C-->E
C-->F
C-->G
D-->G
F-->H
F-->I
{{< / mermaid/diagram >}}

{{< mermaid/diagram >}}
graph LR;

subgraph tada;
  A(something 1)
  C(something 3)
  F(something 6)
end

B(something 2)
D(something 4)
E(something 5)
G(something 7)
H(something 9)
I(something 10)

A-->B
A-->C
A-->D
B-->E
C-->E
C-->F
C-->G
D-->G
F-->H
F-->I
{{< / mermaid/diagram >}}


{{< mermaid/diagram >}}
graph LR;

subgraph tada;
  A(something 1)
  B(something 2)
  E(something 5)
  I(something 10)
end

subgraph tada;
  G(something 7)
  H(something 9)
end

C(something 3)
D(something 4)
F(something 6)


A-->B
A-->C
A-->D
B-->E
C-->E
C-->F
C-->G
D-->G
F-->H
F-->I
{{< / mermaid/diagram >}}

```
View Source of this page to see the syntax or else this blog post is going to be really long
```

Oh and you can nest subgraphs too! And change the flow direction:

{{< mermaid/diagram >}}
graph TB;

subgraph tada;
  A(something 1)
  B(something 2)
  subgraph fiveten;
    E(something 5)
    I(something 10)
  end
end

subgraph tada;
  G(something 7)
  H(something 9)
end

C(something 3)
D(something 4)
F(something 6)


A-->B
A-->C
A-->D
B-->E
C-->E
C-->F
C-->G
D-->G
F-->H
F-->I
{{< / mermaid/diagram >}}

<br />

Depending on your groupings/subgraphs and interactions you might end up with something a bit less messy than that last example. You may also find that moving definitions in and out of subgraphs can really shuffle things around, for what seemed like a subtle change. Here is a reasonably sized, subgraph-filled diagram I've created at work:

{{< mermaid/diagram >}}

graph LR

subgraph DNS
EMEA((EMEA Traffic)) ==> DNS1[Misc DNS]
end

DNS1 ==> CDN[CDN Edge]
DNS1 -.-> DNS2[Cloud DNS]

subgraph CDN
CDN --> DC1-routing
CDN --> DC2-routing
CDN --> DC3-routing
end

subgraph Datacenters EMEA
DC1-routing --> DC1[Datacenter 1]
DC2-routing --> DC2[Datacenter 2]
DC3-routing --> DC3[Datacenter 3]
end

subgraph Direct Connect Cloud 1
DC1 --> DC1-directconnect-C1
DC2 --> DC2-directconnect-C1
DC3 --> DC3-directconnect-C1
end

subgraph Direct Connect Cloud 2
DC1 --> DC1-directconnect-C2
DC2 --> DC2-directconnect-C2
DC3 --> DC3-directconnect-C2
end

subgraph Traffic Management
CDN ==> DNS2
DNS2 ==> API
DNS2 -.-> Logging
DNS2 ==> Web
end

C1[Cloud Region 1]
C2[Cloud Region 2]

C3[Cloud Region 3]
C4[Cloud Region 4]

subgraph Cloud Origins EMEA
Web ==> C1
Web ==> C2
Logging --> C1
Logging --> C2
API ==> C1
API ==> C2

DC1-directconnect-C1 --> C1
DC2-directconnect-C1 --> C1
DC3-directconnect-C1 --> C1

DC1-directconnect-C2 --> C2
DC2-directconnect-C2 --> C2
DC3-directconnect-C2 --> C2
end

subgraph Cloud Origins APAC
Web -.-> C3
Web -.-> C4
Logging -.-> C3
Logging -.-> C4
API -.-> C3
API -.-> C4
end

style EMEA fill:#f9f,stroke:#333,stroke-width:4px
classDef green fill:#9f6,stroke:#333,stroke-width:2px
classDef orange fill:#f96,stroke:#333,stroke-width:4px
class C1,C2 green

{{< / mermaid/diagram >}}


{{< mermaid/diagram >}}

graph RL

subgraph DNS
APAC((APAC Traffic)) ==> DNS1[Misc DNS]
end

DNS1 ==> CDN[CDN Edge]
DNS1 -.-> DNS2[Cloud DNS]

subgraph CDN
CDN --> DC4-routing
CDN --> DC5-routing
end

subgraph Datacenters APAC
DC4-routing --> DC4[Datacenter 4]
DC5-routing --> DC5[Datacenter 5]
end

subgraph Direct Connect Cloud 3
DC4 --> DC4-directconnect-C3
end

subgraph Direct Connect Cloud 4
DC5 --> DC5-directconnect-C4
end

subgraph Traffic Management
CDN ==> DNS2
DNS2 ==> API
DNS2 -.-> Logging
DNS2 ==> Web
end

C1[Cloud Region 1]
C2[Cloud Region 2]

C3[Cloud Region 3]
C4[Cloud Region 4]

subgraph Cloud Origins APAC
Web ==> C3
Web ==> C4
Logging --> C3
Logging --> C4
API ==> C3
API ==> C4

DC4-directconnect-C3 --> C3
DC5-directconnect-C4 --> C4
end

subgraph Cloud Origins EMEA
Web -.-> C1
Web -.-> C2
Logging -.-> C1
Logging -.-> C2
API -.-> C1
API -.-> C2
end

style APAC fill:#f9f,stroke:#333,stroke-width:4px
classDef green fill:#9f6,stroke:#333,stroke-width:2px
classDef orange fill:#f96,stroke:#333,stroke-width:4px
class C3,C4 green

{{< / mermaid/diagram >}}

<br />

Still pretty messy towards the *Cloud Origins*, but pretty useful overall for conveying main traffic flows when explaining how parts of the website were served during our migration from *The Datacenters* to *The Cloud...*

It's even possible for the nodes in a flowchart to be hyperlinks - so they can link off to other useful resources like monitoring or documentation!

Achieved with definitions such as:

```
click EMEA "https://monitoring.example.com" "view EMEA realtime monitoring"
```

Bonus points for you if you noticed this already in the *Mermaid Diagrams Are Awesome* flowchart at the start of this post.


### Sequence Diagrams


Here is a sequence diagram example covering a slice of my day job:

{{< mermaid/diagram >}}

sequenceDiagram;
    participant VendorAPI
    participant MetricsCollector
    participant MonitoringSystem
    participant osgav
    participant AlertingSystem

    Note over VendorAPI,MonitoringSystem: data collection
    loop 45 seconds
      MetricsCollector->>VendorAPI: give me last 5mins data
      MetricsCollector->>MonitoringSystem: send metrics
    end

    Note over MonitoringSystem,AlertingSystem: anomaly detection
    loop 1 minute
      AlertingSystem->>MonitoringSystem: give me last 10mins data
      MonitoringSystem->>AlertingSystem: here you go
      opt rule match
        AlertingSystem-->>osgav: anomaly detected!
      end
    end

    Note over VendorAPI,MonitoringSystem: data integrity
    loop 15 minutes
      MetricsCollector->>MonitoringSystem: give me last 2hrs data
      opt dataset incomplete
        MetricsCollector-->>VendorAPI: query for missing data
        MetricsCollector-->>MonitoringSystem: backfill missing metrics
      end
    end

    Note over MonitoringSystem,AlertingSystem: "monitoring"
    loop adhocly
      osgav->>MonitoringSystem: show me the data
      MonitoringSystem->>osgav: here you go
      opt 
        osgav-->>AlertingSystem: forge rule updates
      end
    end

{{< / mermaid/diagram >}}

<br />

We write some code (*MetricsCollector*) that frequently pings an API (*VendorAPI*) to retrieve *real-time monitoring data* which we then shovel into an internal API (*MonitoringSystem*) which allows us to use all our favourite internal tools to query, visualize and alert on it (*MonitoringSystem again for brevity, AlertingSystem*).

I started off thinking the above would seem like a weird abuse of sequence diagrams to those who use them regularly, but a little reading up on them led me to find the following, which I guess explains why it felt like a good weird as I wrote it:

> "While there is the assumption that Sequence Diagrams were made for developers, the truth is that a company’s business staff could use such diagrams to communicate how exactly the business presently currently works by illustrating how the different business objects interact." - [Creately](https://creately.com/blog/diagrams/the-basics-the-purpose-of-sequence-diagrams-part-1/)

> Some more notes from Creately: [here](https://creately.com/blog/diagrams/sequence-diagram-tutorial/) and [here](https://creately.com/blog/diagrams/10-common-mistakes-to-avoid-in-sequence-diagrams/)


The syntax for my diagram is as follows:

```
sequenceDiagram;
    participant VendorAPI
    participant MetricsCollector
    participant MonitoringSystem
    participant osgav
    participant AlertingSystem

    Note over VendorAPI,MonitoringSystem: data collection
    loop 45 seconds
      MetricsCollector->>VendorAPI: give me last 5mins data
      MetricsCollector->>MonitoringSystem: send metrics
    end

    Note over MonitoringSystem,AlertingSystem: anomaly detection
    loop 1 minute
      AlertingSystem->>MonitoringSystem: give me last 10mins data
      MonitoringSystem->>AlertingSystem: here you go
      opt rule match
        AlertingSystem-->>osgav: anomaly detected!
      end
    end

    Note over VendorAPI,MonitoringSystem: data integrity
    loop 15 minutes
      MetricsCollector->>MonitoringSystem: give me last 2hrs data
      opt dataset incomplete
        MetricsCollector-->>VendorAPI: query for missing data
        MetricsCollector-->>MonitoringSystem: backfill missing metrics
      end
    end

    Note over MonitoringSystem,AlertingSystem: "monitoring"
    loop adhocly
      osgav->>MonitoringSystem: show me the data
      MonitoringSystem->>osgav: here you go
      opt 
        osgav-->>AlertingSystem: forge rule updates
      end
    end
```
### Gantt Charts

Mermaid can also render Gantt charts, but they definitely look like the least enjoyable to write. So far I haven't convinced myself to try. See details [here](https://mermaidjs.github.io/gantt.html).

### Mermaid CLI

It just gets better: there is even a [CLI tool](https://github.com/mermaidjs/mermaid.cli)!

> This CLI tool takes a mermaid definition file as input and generates svg/png/pdf file as output.

**Examples**

```
mmdc -i input.mmd -o output.svg -w 1024 -H 768
mmdc -i input.mmd -o output.png
mmdc -i input.mmd -o output.png -b '#FFF000'
mmdc -i input.mmd -o output.png -b transparent
mmdc -i input.mmd -o output.png -t forest
```

All sorts of possibilities exist due to there being a CLI tool here... for example you could create a more rudimentary version of the Grafana-Mermaid integration.

Instead of elements of a flowchart being tied to a timeseries metric, a script could determine adjustments to the mermaid code (*change a solid line to a dashed line or colour a node orange instead of green to represent link degradation for example*) and regenerate an `output.png` based on this change. 

That image could be placed in some `/var/www/public/` folder and is available to relevant people via `https://internal.example.com/network/status.png` or... you could load that image in a Grafana text panel of course!


### Mermaid Diagrams on Hugo

How else would I be telling you about them?

- [Mermaid Diagrams on Hugo](/lab/hugo-mermaid-diagrams.html)<br />


### More

Mermaid gets a [fleeting mention](https://www.youtube.com/watch?time_continue=1373&v=lHtY7TUsLzk) in this [excellent talk](https://www.usenix.org/conference/srecon17europe/program/presentation/bostock) from Cloudflare at SREcon'17 (Monitoring Cloudflare's Planet-Scale Edge Network) covering this kind of usage, in the context of *Dashboards as living documentation*.

Some info about sequence diagrams:

- [Visual Paradigm - What is Sequence Diagram?](https://www.visual-paradigm.com/guide/uml-unified-modeling-language/what-is-sequence-diagram/)
- [trace modeler - A Quick Introduction to UML Sequence Diagrams](http://www.tracemodeler.com/articles/a_quick_introduction_to_uml_sequence_diagrams/)
- [UML Diagrams - UML Sequence Diagrams](https://www.uml-diagrams.org/sequence-diagrams.html)

And this is a really cool talk - ***Running a Power Plant with Grafana*** - lots of interesting panel development, a few of which are [public](https://grafana.com/orgs/natel):

- https://www.youtube.com/watch?v=I3o3tnj5j6s
- https://grafana.com/plugins/natel-discrete-panel
- https://grafana.com/plugins/natel-usgs-datasource

If you use [vscode](https://code.visualstudio.com/), there is a [plugin](https://marketplace.visualstudio.com/items?itemName=vstirbu.vscode-mermaid-preview ) you might want to try.









