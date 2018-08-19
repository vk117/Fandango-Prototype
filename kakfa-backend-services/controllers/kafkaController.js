
var connection =  new require('../kafka/Connection');

exports.kafkaHandler = function(topic_name,controller) {

	this.topic_name =topic_name;
	this.consumer = connection.getConsumer(topic_name);
	this.producer = connection.getProducer();

	this.consumer.on('message', (message) => {
	    

	    var data = JSON.parse(message.value);
	    var self = this;

	    controller(data.data.req,function(res){

	    		//console.log(self.topic_name,res);

		        var payloads = [
		            { topic: data.replyTo,
		                messages:JSON.stringify({
		                    correlationId:data.correlationId,
		                    data : res
		                }),
		                partition : 0
		            }
		        ];
		        self.producer.send(payloads, function(err, data){

		        
		        return;
	    	});


	    });


	});


}