---
layout: layout.pug
navigationTitle: History Server
excerpt: Enabling HDFS for the Spark History Server
title: Spark History Server
menuWeight: 30
model: /services/spark/data.yml
render: mustache
---

DC/OS {{ model.techName }} 包括 [Spark History Server][3]。由于历史服务器需要 HDFS，您必须明确启用它。

1. 安装 HDFS：

 dcos package install hdfs

 **注意：** HDFS 需要五个私有节点。

1. 创建历史记录 HDFS 目录（默认为 `/history`）。[SSH into your cluster][10] 并运行：

 docker run -it mesosphere/hdfs-client:1.0.0-2.6.0 bash
 ./bin/hdfs dfs -mkdir /history

1. 创建 `spark-history-options.json`：

        {
 "service": {
 "hdfs-config-url": "http://api.hdfs.marathon.l4lb.thisdcos.directory/v1/endpoint" 
          }
        }

1. 安装 Spark History Server：

 dcos package install spark-history --options=spark-history-options.json

1. 创建 `spark-dispatcher-options.json`；

        {
 "service": {
 "spark-history-server-url": http://<dcos_url>/service/spark-history" 
          },
 "hdfs": {
 "config-url": "http://api.hdfs.marathon.l4lb.thisdcos.directory/v1/endpoint" 
          }
        }

1. 安装 Spark 调度器：

 dcos package install spark --options=spark-dispatcher-options.json

1. 启用事件日志，运行作业：

 dcos spark run --submit-args="--conf spark.eventLog.enabled=true --conf spark.eventLog.dir=hdfs://hdfs/history ... --class MySampleClass http://external.website/mysparkapp.jar" 

1. 在此处访问调度器中的作业：`http://<dcos_url>/service/spark/`。它将包含该作业历史服务器条目的链接。

 [3]: http://spark.apache.org/docs/latest/monitoring.html#viewing-after-the-fact
 [10]: /latest/administering-clusters/sshcluster/
